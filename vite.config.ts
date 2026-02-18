import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_BACKEND_ORIGIN || 'http://localhost:8080';

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          replaceAttrValues: {
            'rgb(0,0,0)': 'currentColor',
            black: 'currentColor',
          },
        },
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
