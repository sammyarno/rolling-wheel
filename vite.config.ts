import react from '@vitejs/plugin-react';
import * as path from 'path';
import { UserConfig, defineConfig } from 'vite';

const { resolve } = path;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLibraryBuild =
    mode === 'production' && command === 'build' && process.env.BUILD_TYPE !== 'demo';
  const baseConfig: UserConfig = {
    plugins: [react()],
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: isLibraryBuild
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'RollingWheel',
            fileName: (format) => `index.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
        }
      : {
          outDir: 'demo',
        },
  };

  // Add base path for GitHub Pages when building demo
  if (!isLibraryBuild) {
    baseConfig.base = '/rolling-wheel/';
  }

  return baseConfig;
});
