import { motion } from 'framer-motion'
import frameImg from '../../../assets/images/frame.webp'
import { useLaterSrc } from '../imageGate'
import { EASE } from '../constants'
import './index.css'

const frame = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delayChildren: 0.4, staggerChildren: 0.25 },
  },
}

const line = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* Second screen: striped background with the scalloped frame and a letter inside. */
export default function GentleReader({ heading, lines }) {
  const frameSrc = useLaterSrc(frameImg)
  return (
    <section className="std__reader std-stripes">
      <motion.div
        className="std__reader-frame"
        variants={frame}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <img src={frameSrc} alt="" className="std__reader-frame-img" draggable="false" />
        <div className="std__reader-text">
          <motion.h2 className="std__reader-heading" variants={line}>
            {heading}
          </motion.h2>
          {lines.map((text, i) => (
            <motion.p key={i} className="std__reader-line" variants={line}>
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
