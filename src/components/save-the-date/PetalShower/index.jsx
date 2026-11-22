import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

// Soft rose-petal pinks (like the petals floating in the footer fountain)
const SHADES = [
  ['#fbc6d8', '#ee86ab'],
  ['#f9b3ca', '#e56c97'],
  ['#fcd0de', '#f095b5'],
  ['#f7a5c0', '#dc5a89'],
]

const rand = (min, max) => min + Math.random() * (max - min)

/*
 * Continuous, gentle shower of pink rose petals over its parent (parent needs position: relative).
 * Each petal falls (outer span), sways side to side (middle span) and tumbles in 3D (svg).
 * The animation pauses while the parent is off screen.
 */
export default function PetalShower({ count = 13 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const duration = rand(8, 13)
        return {
          id: i,
          left: `${((i + rand(0.15, 0.85)) / count) * 100}%`, // spread evenly across the width
          size: rand(18, 28),
          duration,
          delay: -rand(0, duration), // negative: already mid-fall when the page appears
          sway: rand(18, 42),
          swayDuration: rand(2.6, 4.2),
          spin: rand(4, 8),
          shade: i % SHADES.length,
          flip: Math.random() < 0.5 ? -1 : 1,
        }
      }),
    [count],
  )

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`std-petals ${visible ? '' : 'std-petals--paused'}`} aria-hidden="true">
      <svg width="0" height="0" className="std-petals__defs">
        <defs>
          {SHADES.map(([light, dark], i) => (
            <radialGradient key={i} id={`std-petal-${i}`} cx="40%" cy="70%" r="75%">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={dark} />
            </radialGradient>
          ))}
        </defs>
      </svg>

      {petals.map((p) => (
        <span
          key={p.id}
          className="std-petals__fall"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span
            className="std-petals__sway"
            style={{
              '--sway': `${p.sway * p.flip}px`,
              animationDuration: `${p.swayDuration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <svg
              className="std-petals__petal"
              viewBox="0 0 20 24"
              width={p.size}
              height={p.size * 1.2}
              style={{ animationDuration: `${p.spin}s`, animationDelay: `${p.delay}s` }}
            >
              {/* rounded petal with a soft notch at the top, narrowing to the base */}
              <path
                d="M10 23 C4 19 0.5 13 1.2 7.5 C1.8 3 5 0.8 7.6 1.6 C8.8 2 9.5 3 10 4 C10.5 3 11.2 2 12.4 1.6 C15 0.8 18.2 3 18.8 7.5 C19.5 13 16 19 10 23 Z"
                fill={`url(#std-petal-${p.shade})`}
              />
              <path d="M10 22 C9.6 16 9.8 9 10 5" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )
}
