import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitepress';
import { lineRangeSnippetPlugin } from './plugins/lineRangeSnippet';
import { getNotePages, getSectionSidebar } from './navigation';

const resolveSource = (sourcePath: string) => fileURLToPath(new URL(sourcePath, import.meta.url));
const composablePages = getNotePages('composables');

export default defineConfig({
  base: process.env.VITEPRESS_BASE ?? '/resource-read/',
  title: 'Resource Read Notes',
  description: 'Source reading notes',
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(lineRangeSnippetPlugin);
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Composables', link: composablePages[0]?.link ?? '/' },
    ],
    sidebar: [getSectionSidebar('composables', 'Composables')],
    socialLinks: [{ icon: 'github', link: 'https://github.com/LYangTou/resource-read' }],
  },
  vite: {
    resolve: {
      alias: {
        '@resource-read/composables': resolveSource('../../packages/composables/src/index.ts'),
        '@resource-read/components': resolveSource('../../packages/components/src/index.ts'),
        '@resource-read/stores': resolveSource('../../packages/stores/src/index.ts'),
        '@resource-read/request': resolveSource('../../packages/request/src/index.ts'),
      },
    },
  },
});
