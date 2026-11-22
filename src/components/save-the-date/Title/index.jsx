import { motion } from 'framer-motion'
import { EASE } from '../constants'
import './index.css'

const container = {
  hidden: {},
  visible: { transition: { delayChildren: 0.6, staggerChildren: 0.35 } },
}

const line = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export default function Title({ intro, names, visible }) {
  return (
    <motion.header
      className="std__title"
      variants={container}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      aria-hidden={!visible}
    >
      <motion.p className="std__title-intro" variants={line}>
        {intro}
      </motion.p>
      <motion.h1 className="std__title-names" variants={line}>
        {names}
      </motion.h1>
    </motion.header>
  )
}
