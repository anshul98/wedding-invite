import { AnimatePresence, motion } from 'framer-motion'
import './index.css'

/*
 * Floating music button at the bottom right on every page: a small vinyl record.
 * Playing → the record spins. Tap → it stops (and the music stops); tap again to play.
 */
export default function MusicButton({ visible, playing, onToggle }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={`std__music-btn ${playing ? 'std__music-btn--playing' : ''}`}
          onClick={onToggle}
          aria-label={playing ? 'Stop music' : 'Play music'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* the disc: grooves + pink centre label with a spindle hole (this part spins) */}
          <span className="std__record" aria-hidden="true">
            <span className="std__record-label">
              <span className="std__record-hole" />
            </span>
          </span>
          {/* light reflection: stays still while the record turns underneath */}
          <span className="std__record-shine" aria-hidden="true" />
          {/* ▶ when stopped (doesn't spin), so it's clear a tap starts it again */}
          {!playing && (
            <svg className="std__record-play" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.5 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
