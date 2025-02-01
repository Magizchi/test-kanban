import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@': '/src',
      '@models': '/src/models',
      '@constants': '/src/constants',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@routes': '/src/routes',
      '@contexts': '/src/contexts',
      '@template': '/src/template',
      '@mocks': '/src/mocks',
      '@utils': '/src/utils',
      '@layouts': '/src/layouts',
      '@hooks': '/src/hooks',
    },
  },
});
