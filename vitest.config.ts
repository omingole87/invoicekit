import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@invoicekit/tokens': path.resolve(__dirname, './packages/tokens/src'),
      '@invoicekit/ui': path.resolve(__dirname, './packages/ui/src'),
      '@invoicekit/renderer': path.resolve(__dirname, './packages/renderer/src'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
  },
});
