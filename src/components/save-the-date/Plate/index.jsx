import { motion } from 'framer-motion'
import plateImg from '../../../assets/images/plate.png'
import { EASE } from '../constants'
import './index.css'

const variants = {
  hidden: { opacity: 0, y: '0%', scale: 1 },
  shown: { opacity: 1, y: '0%', scale: 1, transition: { duration: 0.8 } },
  // "thunk" as the heart drops in, then shrink & settle lower to make room for the title
  revealed: {
    opacity: 1,
    scale: [1, 0.97, 0.78],
    y: ['0%', '0%', '8%'],
    transition: { duration: 1, times: [0, 0.2, 1], ease: EASE },
  },
}

/* Children (heart, slip) are positioned in % of the plate, so they scale with it. */
export default function Plate({ revealed, children }) {
  return (
    <motion.div
      className="std__plate"
      variants={variants}
      initial="hidden"
      animate={revealed ? 'revealed' : 'shown'}
    >
      <img src={plateImg} alt="" className="std__plate-img" draggable="false" />
      {children}
    </motion.div>
  )
}
