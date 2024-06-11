import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore vite-plugin-eslint does not correctly export its types...
import eslint from 'vite-plugin-eslint';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_mantine"; 
        @import "./src/styles/_utilities";`,
      },
    },
  },
});
