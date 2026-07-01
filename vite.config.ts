import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes all asset paths relative, so the site works under
// https://<username>.github.io/<repo>/ no matter what the repo is named.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
