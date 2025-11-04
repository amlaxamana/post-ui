import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://post-api-r9bw.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});