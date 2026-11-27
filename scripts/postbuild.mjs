/*
 * Runs after `vite build`:
 *  1. dist/404.html   = copy of index.html, so any unknown address on GitHub Pages still opens the invite.
 *  2. dist/b/index.html = the bride's-side entry page. Same app, but the tab title and the
 *     WhatsApp/link-preview text say "Aishwarya & Anshul" (link previews read this HTML directly,
 *     without running the app, so the bride's link needs its own copy).
 *  3. dist/save-the-date/index.html and dist/b/save-the-date/index.html = the same two pages at the
 *     addresses the app moves to after opening. Without them those links answer "404" and WhatsApp
 *     shows no preview card when they are shared.
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

const groomStd = html.replace('content="https://aishwaryaanshul.site/"', 'content="https://aishwaryaanshul.site/save-the-date/"')
const brideStd = bride.replace('content="https://aishwaryaanshul.site/b/"', 'content="https://aishwaryaanshul.site/b/save-the-date/"')
mkdirSync('dist/save-the-date', { recursive: true })
writeFileSync('dist/save-the-date/index.html', groomStd)
mkdirSync('dist/b/save-the-date', { recursive: true })
writeFileSync('dist/b/save-the-date/index.html', brideStd)

console.log('postbuild: wrote dist/404.html, dist/b/index.html, dist/save-the-date/index.html, dist/b/save-the-date/index.html')
