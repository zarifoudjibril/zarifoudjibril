import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative path ensures it works out of the box on GitHub Pages & Netlify
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
