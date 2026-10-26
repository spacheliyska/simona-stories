import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // The folder the site is served from. '/' locally and on a custom domain;
  // the GitHub Pages workflow sets BASE_PATH=/simona-stories/.
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    // Builds an extra, polyfilled version that older browsers load automatically.
    // Modern browsers keep getting the small, fast version.
    legacy({
      targets: ['defaults', 'Safari >= 12', 'iOS >= 12', 'Chrome >= 64', 'Firefox >= 67', 'Edge >= 79', 'Samsung >= 9', 'not IE 11'],
    }),
  ],
})
