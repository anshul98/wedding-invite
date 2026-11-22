# Wedding Invite

Frontend-only React SPA (Vite 4 + React 18 + Framer Motion). No backend.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the build

## Structure
```
src/
  components/   # one folder per section (Component.jsx + Component.css)
  data/         # weddingDetails.js — edit names, date, venue here
  hooks/        # useInView (scroll-reveal)
  styles/       # variables.css (theme), global.css, animations.css
  assets/images # photos
```

> Note: pinned to Vite 4 because the local Node is v16. Upgrade Node to 20+ to move to latest Vite.
