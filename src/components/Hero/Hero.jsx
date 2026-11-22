import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { weddingDetails } from '../../data/weddingDetails'
import './Hero.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { bride, groom, displayDate } = weddingDetails

  return (
    <section className="section hero">
      <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
        <motion.p className="hero__eyebrow" variants={item}>
          Together with their families
        </motion.p>
        <motion.h1 className="hero__names" variants={item}>
          {bride} <span className="hero__amp">&amp;</span> {groom}
        </motion.h1>
        <motion.p className="hero__tagline" variants={item}>
          invite you to celebrate their wedding
        </motion.p>
        <motion.p className="hero__date" variants={item}>
          {displayDate}
        </motion.p>
      </motion.div>
      <Link to="/save-the-date" className="hero__scroll animate-float" aria-label="Go to save the date">
        ↓
      </Link>
    </section>
  )
}
