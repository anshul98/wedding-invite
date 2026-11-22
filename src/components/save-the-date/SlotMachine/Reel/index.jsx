import { useEffect, useMemo, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { OutlineHeart, SolidHeart } from '../hearts'
import { REEL_CELL, rect } from '../geometry'
import './index.css'

/*
 * One reel. Strip (top → bottom):
 *   [ ♡, LABEL, ♡, ♡ × cycles, ♡, START, ♡ ]
 * START is the solid heart (like the image) on the first spin, then the label on replays.
 * A spin moves the strip downward from START (centred) to LABEL (centred).
 */
export default function Reel({ reel, label, spinId, duration, cycles, onStop }) {
  const controls = useAnimationControls()
  const [blur, setBlur] = useState(false)
  const firstSpin = spinId <= 1

  const cells = useMemo(
    () => ['o', 'label', 'o', ...Array(cycles).fill('o'), 'o', firstSpin ? 'solid' : 'label', 'o'],
    [cycles, firstSpin],
  )
  const n = cells.length
  // y (in % of strip height) that centres cell i in the window
  const centreY = (i) => `${((1 / (2 * REEL_CELL) - 0.5 - i) / n) * 100}%`

  useEffect(() => {
    if (!spinId) return
    let cancelled = false
    const start = centreY(n - 2)
    const end = centreY(1)
    const bounce = `${((1 / (2 * REEL_CELL) - 0.5 - 1 + 0.12) / n) * 100}%`
    controls.set({ y: start })
    setBlur(true)
    const blurTimer = setTimeout(() => setBlur(false), duration * 650)
    controls
      .start({
        y: [start, bounce, end],
        transition: { duration, times: [0, 0.9, 1], ease: [[0.25, 0.1, 0.25, 1], 'easeInOut'] },
      })
      .then(() => !cancelled && onStop())
    return () => {
      cancelled = true
      clearTimeout(blurTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinId])

  return (
    <div className="std__reel" style={{ ...rect(reel), opacity: spinId ? 1 : 0 }}>
      <motion.div
        className={`std__reel-strip ${blur ? 'std__reel-strip--blur' : ''}`}
        style={{ height: `${n * REEL_CELL * 100}%` }}
        animate={controls}
      >
        {cells.map((c, i) => (
          <div key={i} className="std__reel-cell" style={{ height: `${100 / n}%` }}>
            {c === 'o' && <OutlineHeart className="std__reel-heart-outline" />}
            {c === 'solid' && <SolidHeart className="std__reel-heart-solid" />}
            {c === 'label' && <span className="std__reel-label">{label}</span>}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
