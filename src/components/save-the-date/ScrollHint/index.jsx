import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../constants'
import './index.css'

/* "Scroll Down" indicator (not clickable) that rises in once the intro animation is complete. */
export default function ScrollHint({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="std__scroll-hint"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span>Scroll Down</span>
          <svg className="std__scroll-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
