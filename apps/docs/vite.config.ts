import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@invoicekit/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@invoicekit/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@invoicekit/renderer': path.resolve(__dirname, '../../packages/renderer/src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
