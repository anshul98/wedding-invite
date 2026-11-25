import { motion } from 'framer-motion'
import footerImg from '../../../assets/images/footer.webp'
import { useLaterSrc } from '../imageGate'
import HeartDivider from '../HeartDivider'
import PetalShower from '../PetalShower'
import { EASE } from '../constants'
import './index.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const footerAnim = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: EASE,
      delayChildren: 0.5,
      staggerChildren: 0.18,
    },
  },
}

/* "27th February 2027" → the "th" (or st/nd/rd) is shown small and raised, like printed invitations */
function DateWithOrdinal({ text }) {
  const m = text.match(/^(\d+)(st|nd|rd|th)(.*)$/)
  if (!m) return text
  return (
    <>
      {m[1]}
      <sup className="std__closing-ordinal">{m[2]}</sup>
      {m[3]}
    </>
  )
}

/* Last screen: stripes, names and message, then the full-width footer archway with the date, hashtag and note between its pillars */
export default function Closing({ names, message, date, hashtag, note }) {
  const footerSrc = useLaterSrc(footerImg)
  return (
    <motion.section
      className="std__closing std-stripes"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <PetalShower count={13} />

      <div className="std__closing-text">
        <motion.h2 className="std__closing-names" variants={item}>
          {names}
        </motion.h2>
        <motion.p className="std__closing-message" variants={item}>
          {message}
        </motion.p>
        <motion.div className="std__closing-divider" variants={item}>
          <HeartDivider />
        </motion.div>
      </div>

      {/* footer archway; date, hashtag and note sit in the open space between its pillars */}
      <div className="std__closing-stage">
        <motion.div className="std__closing-footer" variants={footerAnim}>
          <img
            src={footerSrc}
            alt="Pink marble archway with roses, two swans and a fountain"
            className="std__closing-footer-img"
            draggable="false"
          />
          <div className="std__closing-pillars">
            <motion.p className="std__closing-date" variants={item}>
              <DateWithOrdinal text={date} />
            </motion.p>
            <motion.p className="std__closing-hashtag" variants={item}>
              {hashtag}
            </motion.p>
            <motion.p className="std__closing-note" variants={item}>
              {note}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
