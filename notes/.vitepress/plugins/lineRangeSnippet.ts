import fs from 'node:fs';
import path from 'node:path';

const snippetRE = /^<<<\s+(.+?)\{(\d+)(?:-(\d+))?\}\s*$/;

function getLang(filePath: string) {
  const ext = path.extname(filePath).slice(1);
  return ext === 'vue' ? 'vue' : ext;
}

function resolveSnippetPath(rawPath: string, currentFile: string) {
  const normalizedPath = rawPath.replace(/^@/, '.');
  return path.resolve(path.dirname(currentFile), normalizedPath);
}

export function lineRangeSnippetPlugin(md: any) {
  md.block.ruler.before('snippet', 'line_range_snippet', (state: any, startLine: number, _endLine: number, silent: boolean) => {
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const lineText = state.src.slice(pos, max).trim();
    const match = lineText.match(snippetRE);

    if (!match) {
      return false;
    }

    if (silent) {
      return true;
    }

    const [, rawPath, rawStart, rawEnd] = match;
    const start = Number(rawStart);
    const end = Number(rawEnd ?? rawStart);
    const currentFile = state.env.realPath ?? state.env.path;

    state.line = startLine + 1;
    const token = state.push('fence', 'code', 0);
    token.markup = '```';
    token.map = [startLine, startLine + 1];

    if (!currentFile) {
      token.info = 'text';
      token.content = `Unable to resolve snippet owner for: ${rawPath}`;
      return true;
    }

    const resolvedPath = resolveSnippetPath(rawPath.trim(), currentFile);
    token.info = getLang(resolvedPath);

    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
      token.content = `Invalid line range: ${rawStart}-${rawEnd ?? rawStart}`;
      return true;
    }

    if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
      token.content = `Code snippet path not found: ${resolvedPath}`;
      return true;
    }

    const lines = fs.readFileSync(resolvedPath, 'utf8').replace(/\r\n/g, '\n').split('\n');
    token.content = lines.slice(start - 1, end).join('\n');

    return true;
  });
}
