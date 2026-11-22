import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import lucknowImg from '../../../assets/images/lucknow.png'
import IconButton from '../IconButton'
import { EASE } from '../constants'
import './index.css'

// Inner archway of the gate (the passage) in lucknow.png, in image px (photo is 1754 x 897).
// If the photo is replaced, re-measure these. The photo's real size is read at runtime.
const GATE = { x: 788, y: 515, w: 167, h: 230 } // left, pointed top, width, top → ground

// Clear window size relative to the archway (bottom stays on the ground line)
const WINDOW_SCALE_X = 1.2 // width
const WINDOW_SCALE_Y = 1.1 // height
// Sideways nudge, as a fraction of the archway width (positive = right)
const WINDOW_SHIFT_X = 0.06

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const windowAnim = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
}

/*
 * Show the photo as large as possible without zooming in ("cover"), centred on the gate,
 * then work out where the gate's archway lands on screen so the clear window can sit exactly on it.
 */
function useGateLayout(sectionRef, photoRef) {
  const [layout, setLayout] = useState(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const photo = photoRef.current
    if (!section || !photo) return

    const measure = () => {
      if (!photo.naturalWidth) return // not loaded yet
      const sw = section.clientWidth
      const sh = section.clientHeight
      const scale = Math.max(sw / photo.naturalWidth, sh / photo.naturalHeight)
      const iw = photo.naturalWidth * scale
      const ih = photo.naturalHeight * scale
      // centre the gate horizontally (without leaving gaps), centre vertically
      const gateCx = (GATE.x + GATE.w / 2) * scale
      const left = Math.min(0, Math.max(sw - iw, sw / 2 - gateCx))
      const top = (sh - ih) / 2

      // window = archway resized by WINDOW_SCALE_X/Y, centred on it (plus nudge), bottom on the ground line
      const width = GATE.w * scale * WINDOW_SCALE_X
      const height = GATE.h * scale * WINDOW_SCALE_Y
      const centreX = left + (GATE.x + GATE.w / 2 + GATE.w * WINDOW_SHIFT_X) * scale
      const bottom = top + (GATE.y + GATE.h) * scale

      setLayout({
        photo: { width: iw, height: ih, left, top },
        gate: { left: centreX - width / 2, top: bottom - height, width, height },
      })
    }

    measure()
    photo.addEventListener('load', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(section)
    return () => {
      ro.disconnect()
      photo.removeEventListener('load', measure)
    }
  }, [sectionRef, photoRef])

  return layout
}

/*
 * Fourth screen: whole Lucknow photo in the background, a see-through pink layer over it,
 * and an arch-shaped clear window exactly over the gate's archway.
 * Text sits in the space above the arch, the button in the space below it.
 */
export default function Venue({ intro, label, city, lines, directionsLabel, mapsUrl }) {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const layout = useGateLayout(sectionRef, photoRef)
  const gate = layout?.gate

  return (
    <motion.section
      ref={sectionRef}
      className="std__venue"
      style={gate ? { '--gate-top': `${gate.top}px`, '--gate-bottom': `${gate.top + gate.height}px` } : undefined}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <img
        ref={photoRef}
        src={lucknowImg}
        alt=""
        className={`std__venue-bg ${layout ? 'std__venue-bg--placed' : ''}`}
        style={layout?.photo}
        draggable="false"
      />

      {/* Clear arch window. Its huge box-shadow IS the pink layer, so the hole follows the arch shape. */}
      {gate && (
        <motion.div
          className="std__venue-window"
          style={{
            ...gate,
            borderRadius: `${gate.width / 2}px ${gate.width / 2}px 10px 10px`,
          }}
          variants={windowAnim}
          aria-hidden="true"
        />
      )}

      <div className="std__venue-text">
        <motion.p className="std__venue-intro" variants={item}>
          {intro}
        </motion.p>
        <motion.p className="std__venue-label" variants={item}>
          {label}
        </motion.p>
        <motion.h2 className="std__venue-city" variants={item}>
          {city}
        </motion.h2>
        {lines.map((text, i) => (
          <motion.p key={i} className="std__venue-line" variants={item}>
            {text}
          </motion.p>
        ))}
      </div>

      <div className="std__venue-action">
        <motion.div variants={item}>
          <IconButton icon="🗺️" label={directionsLabel} variant="light" href={mapsUrl} />
        </motion.div>
      </div>
    </motion.section>
  )
}
