import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    proxy: {
      '/api': {
        target: 'https://localhost:7192',
        changeOrigin: true,
        secure: false,
      },
    },
  });
};
