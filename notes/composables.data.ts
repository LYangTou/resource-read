import { getNotePages } from './.vitepress/navigation';

export default {
  watch: ['composables/*.md'],
  load() {
    return getNotePages('composables');
  },
};
