import { AnimatePresence, motion } from 'framer-motion'
import { TOP_LIGHTS, px, py } from '../geometry'
import './index.css'

// halo extends beyond the light's rim (× radius)
const HALO = 1.9

/* Glow over the three round lights on top of the machine; stays on once lit */
export default function TopLights({ on }) {
  return (
    <AnimatePresence>
      {on &&
        TOP_LIGHTS.map((l, i) => (
          <motion.span
            key={i}
            className="std__top-light"
            style={{
              left: px(l.x - l.r * HALO),
              top: py(l.y - l.r * HALO),
              width: px(l.r * 2 * HALO),
              aspectRatio: '1',
              animationDelay: `${i * 0.3}s`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          />
        ))}
    </AnimatePresence>
  )
}
