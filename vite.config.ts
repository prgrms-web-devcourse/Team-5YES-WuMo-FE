import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

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
  ],
  resolve: {
    alias: [
      { find: '@/src', replacement: resolve(__dirname, 'src') },
      { find: '@/components', replacement: resolve(__dirname, 'src/components') },
      { find: '@/stories', replacement: resolve(__dirname, 'src/stories') },
      { find: '@/types', replacement: resolve(__dirname, 'src/types') },
    ],
  },
});
