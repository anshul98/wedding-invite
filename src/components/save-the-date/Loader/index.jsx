import { AnimatePresence, motion } from 'framer-motion'
import './index.css'

/* Small pulsing heart shown on the first screen while its images are still downloading */
export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="std__loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }} // fast connections never see it
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          role="status"
          aria-label="Loading"
        >
          <span className="std__loader-heart" aria-hidden="true">
            ♥
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
