import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// The site is served from the root of its own domain (custom domain on GitHub Pages), so base is "/".
// (Without a custom domain it would be https://<username>.github.io/wedding-invite/ and base
// would need to be '/wedding-invite/' for production builds.)
export default defineConfig({
  base: '/',
  plugins: [react()],
})
