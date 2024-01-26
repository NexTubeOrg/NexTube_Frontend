import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      // Proxy /api requests to your API server
      '/api': {
        target: 'https://bnext.itstep.click/', // Replace with your API server's URL
        changeOrigin: true,
        secure: false,
      },
      '/signalr': {
        target: 'https://bnext.itstep.click/',
        changeOrigin: true,
        secure: false,
        ws: true, // it`s important to use SignalR with Websockets as transport
      },
    },
  },
});
