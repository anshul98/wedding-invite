import { createContext, useContext } from 'react'

/*
 * Download order on slow networks: the first screen's images (plate, heart, Ganesh ji) load first,
 * and the later pages' big images only start once those are done, so they don't share bandwidth.
 * index.jsx provides `true` once the first screen is ready. Default true = no waiting.
 */
export const LaterImagesAllowed = createContext(true)

/* Returns `src` once later images may load, otherwise undefined (the <img> waits, hidden) */
export function useLaterSrc(src) {
  return useContext(LaterImagesAllowed) ? src : undefined
}
