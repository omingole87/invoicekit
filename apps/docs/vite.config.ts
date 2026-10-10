import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@invoicekit/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@invoicekit/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@invoicekit/renderer': path.resolve(__dirname, '../../packages/renderer/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
