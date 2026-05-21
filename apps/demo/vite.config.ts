import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@resource-read/composables': resolve(__dirname, '../../packages/composables/src'),
      '@resource-read/components': resolve(__dirname, '../../packages/components/src'),
      '@resource-read/stores': resolve(__dirname, '../../packages/stores/src'),
      '@resource-read/request': resolve(__dirname, '../../packages/request/src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
