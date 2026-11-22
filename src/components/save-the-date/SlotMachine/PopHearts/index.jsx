import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SolidHeart } from '../hearts'
import { BAR, IMG_H, px, py } from '../geometry'
import './index.css'

// start x on the bar (image px), where it lands across the screen (0 = left edge, 1 = right edge), spin
const HEARTS = [
  { x: 360, land: 0.08, spin: -220, delay: 0 },
  { x: 430, land: 0.3, spin: 150, delay: 0.07 },
  { x: 500, land: 0.5, spin: -120, delay: 0.03 },
  { x: 570, land: 0.7, spin: 160, delay: 0.1 },
  { x: 640, land: 0.92, spin: 230, delay: 0.05 },
]
const UP_TIME = 0.3 // seconds to shoot up
const FALL_SPEED = 900 // px per second (roughly) on the way down

/*
 * 5 small solid pink hearts shoot up out of the bar, then spread out and fall to the bottom of the screen.
 * Re-plays whenever burstId changes.
 */
export default function PopHearts({ burstId }) {
  const ref = useRef(null)
  const [burst, setBurst] = useState(null)

  // measure where the bar is on screen so the hearts fall exactly to the bottom edge
  useLayoutEffect(() => {
    if (!burstId || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    const barY = box.top + (BAR.y / IMG_H) * box.height
    setBurst({
      id: burstId,
      up: box.height * 0.18,
      fall: window.innerHeight - barY + 40, // a little past the bottom edge
      // sideways distance from each heart's start point to its landing spot on screen
      dx: HEARTS.map((h) => h.land * window.innerWidth - (box.left + (h.x / 1024) * box.width)),
    })
  }, [burstId])

  return (
    <div ref={ref} className="std__pop-hearts" aria-hidden="true">
      {burst &&
        HEARTS.map((h, i) => {
          const total = UP_TIME + (burst.fall + burst.up) / FALL_SPEED
          const upAt = UP_TIME / total
          return (
            <motion.div
              key={`${burst.id}-${i}`}
              className="std__pop-heart"
              style={{ left: px(h.x), top: py(BAR.y) }}
              initial={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 1],
                scale: [0.3, 1.1, 1, 1],
                x: [0, burst.dx[i] * 0.35, burst.dx[i]],
                y: [0, -burst.up, burst.fall],
                rotate: [0, h.spin * 0.2, h.spin],
              }}
              transition={{
                duration: total,
                delay: h.delay,
                times: [0, upAt, 1],
                // fast pop up, then accelerate downwards like gravity
                ease: [[0.2, 0.9, 0.3, 1], [0.5, 0, 0.9, 0.6]],
                opacity: { duration: total, delay: h.delay, times: [0, 0.08, 0.9, 1] },
                scale: { duration: total, delay: h.delay, times: [0, upAt, upAt + 0.1, 1] },
              }}
            >
              <SolidHeart />
            </motion.div>
          )
        })}
    </div>
  )
}
