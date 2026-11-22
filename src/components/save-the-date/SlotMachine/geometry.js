/*
 * Positions measured on slotmachine.png (1024 x 1536 px).
 * Everything is converted to % of the machine so overlays scale with it.
 */
export const IMG_W = 1024
export const IMG_H = 1536

export const px = (x) => `${(x / IMG_W) * 100}%`
export const py = (y) => `${(y / IMG_H) * 100}%`

/* Rectangle in image px → absolute-position style in % */
export const rect = ({ x, y, w, h }) => ({ left: px(x), top: py(y), width: px(w), height: py(h) })

// White reels (window area)
export const REELS = [
  { x: 290, y: 433, w: 128, h: 257 },
  { x: 433, y: 433, w: 128, h: 257 },
  { x: 576, y: 433, w: 128, h: 257 },
]
// Distance between symbols on a reel ≈ 89px → 34.6% of the reel window height
export const REEL_CELL = 89 / 257

// Handle (knob + stick) above the pivot housing, and the pivot point inside the housing
export const LEVER = { x: 857, y: 428, w: 115, h: 305 }
export const LEVER_PIVOT = { x: 900, y: 790 }

// Three round lights on top
export const TOP_LIGHTS = [
  { x: 368, y: 225, r: 34 },
  { x: 500, y: 225, r: 40 },
  { x: 630, y: 225, r: 34 },
]

// Horizontal bar the hearts pop out of (centre line of the dark channel)
export const BAR = { y: 315, x1: 300, x2: 700 }
