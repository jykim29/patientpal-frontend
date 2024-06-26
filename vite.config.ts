import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://43.201.129.48:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
