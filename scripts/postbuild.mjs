/*
 * Runs after `vite build`:
 *  1. dist/404.html   = copy of index.html, so any unknown address on GitHub Pages still opens the invite.
 *  2. dist/b/index.html = the bride's-side entry page. Same app, but the tab title and the
 *     WhatsApp/link-preview text say "Aishwarya & Anshul" (link previews read this HTML directly,
 *     without running the app, so the bride's link needs its own copy).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('dist/index.html', 'utf8')
writeFileSync('dist/404.html', html)

const bride = html
  .replaceAll('Anshul &amp; Aishwarya', 'Aishwarya &amp; Anshul')
  .replace('content="https://aishwaryaanshul.site/"', 'content="https://aishwaryaanshul.site/b/"')
if (bride === html) throw new Error('postbuild: names not found in index.html — bride page not created')
mkdirSync('dist/b', { recursive: true })
writeFileSync('dist/b/index.html', bride)

console.log('postbuild: wrote dist/404.html and dist/b/index.html')
