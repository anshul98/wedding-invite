import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages serves the site at https://<username>.github.io/wedding-invite/,
// so production builds use that sub-path. Local dev stays at "/".
// If the GitHub repo gets a different name, change '/wedding-invite/' to match.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/wedding-invite/' : '/',
  plugins: [react()],
}))
