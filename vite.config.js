import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server runs at root ('/') while GitHub Pages serves the app under
// /fake-admin-4design-react/. Conditional base keeps both paths happy.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/fake-admin-4design-react/' : '/',
  build: {
    outDir: 'docs',
  },
}))
