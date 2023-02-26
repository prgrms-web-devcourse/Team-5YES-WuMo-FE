import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          [
            '@emotion/babel-plugin',
            {
              autoLabel: 'dev-only',
              labelFormat: '[dirname]--[filename]--[local]___',
            },
          ],
        ],
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      { find: '@/api', replacement: resolve(__dirname, 'src/api') },
      { find: '@/components', replacement: resolve(__dirname, 'src/components') },
      { find: '@/hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@/pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@/store', replacement: resolve(__dirname, 'src/store') },
      { find: '@/styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@/types', replacement: resolve(__dirname, 'src/types') },
      { find: '@/utils', replacement: resolve(__dirname, 'src/utils') },
    ],
  },
});
