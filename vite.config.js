import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      // Proxy /api requests to your API server
      '/api': {
        target: 'https://localhost:7192', // Replace with your API server's URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
