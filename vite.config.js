import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Creative-Website/',
  build: {
    rollupOptions: { input: { main: new URL("./index.html", import.meta.url).pathname, pricing: new URL("./pricing.html", import.meta.url).pathname } },
    assetsInlineLimit: 0,   // never inline frames
    chunkSizeWarningLimit: 1200,
  },
});
