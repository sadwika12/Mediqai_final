import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // When you wire the frontend up to the FastAPI backend, uncomment this
    // so calls to /api/* during `npm run dev` are forwarded to it instead
    // of hitting the Vite dev server:
    // proxy: {
    //   '/api': 'http://localhost:8000',
    // },
  },
});