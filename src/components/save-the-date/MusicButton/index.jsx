import { AnimatePresence, motion } from 'framer-motion'
import './index.css'

/*
 * Floating music button at the bottom right on every page: a small vinyl record.
 * A ♪ on the label shows it's for music.
 * Playing → the record spins. Tap → it stops (and the music stops), with a line through the ♪; tap again to play.
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
          {/* the disc: grooves + pink centre label (this part spins) */}
          <span className="std__record" aria-hidden="true">
            <span className="std__record-label" />
          </span>
          {/* light reflection: stays still while the record turns underneath */}
          <span className="std__record-shine" aria-hidden="true" />
          {/* ♪ on the label (doesn't spin), so everyone can tell the button is for music */}
          <svg className="std__record-note" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 4.5v10.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M11 4.5c1.6 1.9 4.6 2.4 5.6 4.6.6 1.4.2 2.9-.6 3.9.2-1.6-.6-3-2.2-3.7-1-.4-2-.7-2.8-1.3z"
              fill="currentColor"
            />
            <ellipse
              cx="8.4"
              cy="16.2"
              rx="3.3"
              ry="2.6"
              transform="rotate(-22 8.4 16.2)"
              fill="currentColor"
            />
          </svg>
          {/* stopped: a line through the note (music off) */}
          {!playing && <span className="std__record-slash" aria-hidden="true" />}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
