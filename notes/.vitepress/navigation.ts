import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DefaultTheme } from 'vitepress';

export interface NotePage {
  text: string;
  link: string;
}

const notesRoot = fileURLToPath(new URL('..', import.meta.url));
const excludedFiles = new Set(['README.md', 'index.md']);

const toVitePressLink = (filePath: string) =>
  `/${relative(notesRoot, filePath).replace(/\\/g, '/').replace(/\.md$/, '')}`;

const toFrontmatterTitle = (markdown: string) => {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const title = frontmatter?.[1].match(/^title:\s*['"]?(.+?)['"]?\s*$/m);

  return title?.[1]?.trim();
};

const toTitle = (filePath: string) => {
  const markdown = readFileSync(filePath, 'utf8');

  return toFrontmatterTitle(markdown) || basename(filePath, extname(filePath));
};

export const getNotePages = (section: string): NotePage[] => {
  const sectionPath = join(notesRoot, section);

  return readdirSync(sectionPath)
    .filter((fileName) => fileName.endsWith('.md') && !excludedFiles.has(fileName))
    .map((fileName) => join(sectionPath, fileName))
    .filter((filePath) => statSync(filePath).isFile())
    .map((filePath) => ({
      text: toTitle(filePath),
      link: toVitePressLink(filePath),
    }))
    .sort((a, b) => a.text.localeCompare(b.text));
};

export const getSectionSidebar = (section: string, text: string): DefaultTheme.SidebarItem => ({
  text,
  items: getNotePages(section),
});
