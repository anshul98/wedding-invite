import { motion } from 'framer-motion'
import HeartDivider from '../HeartDivider'
import SlotMachine from '../SlotMachine'
import IconButton from '../IconButton'
import { EASE } from '../constants'
import './index.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* Third screen: light pink, "Our Wedding Date / Save the Date", divider, slot machine, calendar button */
export default function WeddingDate({ intro, heading, reels, calendarLabel, calendarUrl }) {
  return (
    <section className="std__date">
      <motion.div
        className="std__date-content"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="std__date-intro" variants={item}>
          {intro}
        </motion.p>
        <motion.h2 className="std__date-heading" variants={item}>
          {heading}
        </motion.h2>
        <motion.div variants={item}>
          <HeartDivider />
        </motion.div>
        <motion.div className="std__date-machine" variants={item}>
          <SlotMachine reels={reels} />
        </motion.div>
        <motion.div variants={item}>
          <IconButton icon="📅" label={calendarLabel} variant="dark" href={calendarUrl} />
        </motion.div>
      </motion.div>
    </section>
  )
}
