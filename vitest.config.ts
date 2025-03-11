import { defineConfig } from 'vitest/config';
import * as path from 'path';
const { resolve } = path;

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
});