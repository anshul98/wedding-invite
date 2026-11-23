import { motion } from 'framer-motion'
import ganeshImg from '../../../assets/images/ganeshji.webp'
import { EASE } from '../constants'
import './index.css'

/* Small Ganesh ji at the top centre of the first screen; shown from the very start */
export default function Ganesh() {
  return (
    <motion.img
      src={ganeshImg}
      alt="Shri Ganesh"
      className="std__ganesh"
      draggable="false"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: EASE }}
    />
  )
}
