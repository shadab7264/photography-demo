import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path for GitHub Pages project site: https://<user>.github.io/photography-demo/
export default defineConfig({
  base: '/photography-demo/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
