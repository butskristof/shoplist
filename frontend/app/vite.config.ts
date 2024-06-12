import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore vite-plugin-eslint does not correctly export its types...
import eslint from 'vite-plugin-eslint';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default ({ mode = 'development' }: UserConfig) => {
  // the env isn't readily available, so we first create an object using Node's environment
  // and merge Vite's environment into it
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), eslint()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SHOPLISTS_API_BASEURL,
          rewrite: (path) => path.replace('/api', ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/_mantine"; @import "./src/styles/_utilities";`,
        },
      },
    },
  });
};
