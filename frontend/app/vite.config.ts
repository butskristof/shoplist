import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore vite-plugin-eslint does not correctly export its types...
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_mantine"; 
        @import "./src/styles/_utilities";`,
      },
    },
  },
});
