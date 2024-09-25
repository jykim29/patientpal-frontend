import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      global: {},
    },
    plugins: [react(), svgrPlugin(), ViteImageOptimizer()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/ws': {
          target: env.VITE_BACKEND_BASE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const moduleName = id
                .split('node_modules/.store/')
                .pop()
                ?.split('/')[0];
              return `vendor/${moduleName}`;
            }
          },
        },
      },
    },
  };
});
