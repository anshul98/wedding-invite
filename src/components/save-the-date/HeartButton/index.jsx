import { motion } from 'framer-motion'
import btnImg from '../../../assets/images/btn.webp'
import { HEART_TILT } from '../constants'
import './index.css'

/*
 * btn.png has ~10% transparent padding per side (visible heart ≈ 81% of image width),
 * so the <img> is 73.7% of plate width to make the *visible* heart 60% of the plate.
 * That makes the <img> ≈ 43.3% of plate height; it's centred at 61%.
 * Heart centre (61%) → slot centre (30.7%) = -30.3% of plate height
 *   = -70% of the heart's own height (framer-motion % is relative to the element).
 * Visible heart 60% → slot 36% of plate width ⇒ scale ≈ 0.56.
 */
const TO_SLOT_Y = '-70%'
const SLOT_SCALE = 0.56

const variants = {
  idle: {
    rotate: [HEART_TILT, HEART_TILT + 4, HEART_TILT],
    y: ['0%', '-2%', '0%'],
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
  },
  inserting: {
    // 1) lift  2) flip while flying to the slot  3) tip edge-on into the slot
    rotate: [null, HEART_TILT, HEART_TILT, HEART_TILT], // stays tilted the whole way in
    scale: [1, 1.08, SLOT_SCALE, SLOT_SCALE],
    y: [null, '4%', TO_SLOT_Y, TO_SLOT_Y],
    rotateY: [0, 0, 360, 360],
    rotateX: [0, 0, 0, 88],
    opacity: [1, 1, 1, 0],
    transition: {
      duration: 2,
      times: [0, 0.2, 0.7, 1],
      ease: ['easeOut', 'easeInOut', 'easeIn'],
    },
  },
}

export default function HeartButton({ inserting, onInserted }) {
  return (
    <motion.img
      src={btnImg}
      alt="Click here"
      className="std__heart"
      draggable="false"
      fetchPriority="high"
      variants={variants}
      initial={{ rotate: HEART_TILT }}
      animate={inserting ? 'inserting' : 'idle'}
      onAnimationComplete={(def) => def === 'inserting' && onInserted()}
    />
  )
}
