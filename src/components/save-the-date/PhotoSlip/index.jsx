import { motion } from 'framer-motion'
import Photo from '../Photo'
import { SLIP_TILT } from '../constants'
import './index.css'

const variants = {
  hidden: { y: '-100%', rotate: 0 },
  visible: {
    // feed straight down out of the slot, then swing (overshoot) and settle at a tilt
    y: ['-100%', '0%', '0%', '0%', '0%'],
    rotate: [0, 0, SLIP_TILT * 1.4, SLIP_TILT * 0.75, SLIP_TILT],
    transition: {
      delay: 1,
      duration: 2.2,
      times: [0, 0.55, 0.75, 0.88, 1],
      ease: ['easeOut', 'easeOut', 'easeInOut', 'easeInOut'],
    },
  },
}

export default function PhotoSlip({ photos, visible, onShown }) {
  return (
    // Clip box starts at the slot, so the slip looks like it feeds out of it
    <div className="std__slip-clip">
      <motion.div
        className="std__slip"
        variants={variants}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        onAnimationComplete={(def) => def === 'visible' && onShown?.()}
      >
        {photos.map((src, i) => (
          <Photo key={i} src={src} label={`Photo ${i + 1}`} />
        ))}
      </motion.div>
    </div>
  )
}
