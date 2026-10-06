import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Creative-Website/',
  build: {
    assetsInlineLimit: 0,   // never inline frames
    chunkSizeWarningLimit: 1200,
  },
});
