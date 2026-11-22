import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { LEVER, LEVER_PIVOT, rect } from '../geometry'
import './index.css'

/*
 * The handle is cut out of the machine image itself (same pixels), so it can swing
 * independently. It rotates around the pivot inside the housing: down towards the viewer, then back up.
 */
export default function Lever({ src, pullId }) {
  const controls = useAnimationControls()

  useEffect(() => {
    if (!pullId) return
    controls.start({
      rotateX: [0, -150, -150, 0],
      transition: { duration: 1, times: [0, 0.35, 0.45, 1], ease: ['easeIn', 'linear', 'easeOut'] },
    })
  }, [pullId, controls])

  const origin = `${((LEVER_PIVOT.x - LEVER.x) / LEVER.w) * 100}% ${((LEVER_PIVOT.y - LEVER.y) / LEVER.h) * 100}%`

  return (
    <motion.div
      className="std__lever"
      style={{ ...rect(LEVER), transformOrigin: origin, transformPerspective: 500 }}
      animate={controls}
    >
      <img
        src={src}
        alt=""
        draggable="false"
        style={{
          width: `${(1024 / LEVER.w) * 100}%`,
          left: `${(-LEVER.x / LEVER.w) * 100}%`,
          top: `${(-LEVER.y / LEVER.h) * 100}%`,
        }}
      />
    </motion.div>
  )
}
