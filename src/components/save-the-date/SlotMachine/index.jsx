import { useRef, useState } from 'react'
import slotMachineImg from '../../../assets/images/slotmachine.webp'
import { useLaterSrc } from '../imageGate'
import Lever from './Lever'
import Reel from './Reel'
import TopLights from './TopLights'
import TapLabel from './TapLabel'
import PopHearts from './PopHearts'
import { LEVER, REELS, px, py } from './geometry'
import './index.css'

// Right reel stops first, then middle, then left
const SPIN = [
  { duration: 3.0, cycles: 22 },
  { duration: 2.4, cycles: 17 },
  { duration: 1.8, cycles: 12 },
]
const SPIN_START_DELAY = 350 // ms after the handle starts moving

// Cut the handle's area out of the main image (the Lever component draws it instead)
const HANDLE_CUTOUT = `polygon(0 0, 100% 0, 100% ${py(LEVER.y)}, ${px(LEVER.x)} ${py(LEVER.y)}, ${px(LEVER.x)} ${py(LEVER.y + LEVER.h)}, 100% ${py(LEVER.y + LEVER.h)}, 100% 100%, 0 100%)`

/*
 * Tap the machine: handle goes down & up → reels spin → stop right-to-left on the date
 * → hearts pop out of the bar and the three top lights glow. Can be replayed.
 */
export default function SlotMachine({ reels, className = '' }) {
  const [pullId, setPullId] = useState(0)
  const [spinId, setSpinId] = useState(0)
  const [burstId, setBurstId] = useState(0)
  const [lit, setLit] = useState(false)
  const imgSrc = useLaterSrc(slotMachineImg)
  const busy = useRef(false)
  const stopped = useRef(0)

  const handleClick = () => {
    if (busy.current) return
    busy.current = true
    stopped.current = 0
    setPullId((n) => n + 1)
    setTimeout(() => setSpinId((n) => n + 1), SPIN_START_DELAY)
  }

  const handleReelStop = () => {
    stopped.current += 1
    if (stopped.current === REELS.length) {
      busy.current = false
      setLit(true)
      setBurstId((n) => n + 1)
    }
  }

  return (
    <div
      className={`std__machine ${className}`}
      onClick={handleClick}
      role="button"
      aria-label="Pull the handle to reveal the date"
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="std-reel-blur">
          <feGaussianBlur stdDeviation="0 1.2" />
        </filter>
      </svg>

      <Lever src={imgSrc} pullId={pullId} />
      <img
        src={imgSrc}
        alt="Slot machine"
        className="std__machine-img"
        style={{ clipPath: HANDLE_CUTOUT }}
        draggable="false"
      />
      {REELS.map((reel, i) => (
        <Reel
          key={i}
          reel={reel}
          label={reels[i]}
          spinId={spinId}
          duration={SPIN[i].duration}
          cycles={SPIN[i].cycles}
          onStop={handleReelStop}
        />
      ))}
      <TapLabel pulsing={pullId === 0} />
      <TopLights on={lit} />
      <PopHearts burstId={burstId} />
    </div>
  )
}
