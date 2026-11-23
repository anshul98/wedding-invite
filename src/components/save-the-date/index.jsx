import { useState } from 'react'
import Ganesh from './Ganesh'
import Title from './Title'
import Plate from './Plate'
import HeartButton from './HeartButton'
import PhotoSlip from './PhotoSlip'
import ScrollHint from './ScrollHint'
import GentleReader from './GentleReader'
import WeddingDate from './WeddingDate'
import Venue from './Venue'
import Closing from './Closing'
import Loader from './Loader'
import useImagesReady from './useImagesReady'
import { LaterImagesAllowed } from './imageGate'
import { CLOSING, LETTER, SLIP_PHOTOS, TITLE, VENUE, WEDDING_DATE } from './content'
import plateImg from '../../assets/images/plate.webp'
import btnImg from '../../assets/images/btn.webp'
import ganeshImg from '../../assets/images/ganeshji.webp'
import './index.css'

/*
 * Slow networks: never show a half-downloaded image. Every <img> inside the invite stays hidden
 * (CSS: .std img:not([data-loaded])) until its own load/error event, which this marks.
 * A data attribute (not a class) because React rewrites className on re-render.
 * Registered before React renders, so no image can finish before we are listening.
 */
if (typeof document !== 'undefined') {
  const markLoaded = (e) => {
    if (e.target instanceof HTMLImageElement) e.target.setAttribute('data-loaded', '')
  }
  document.addEventListener('load', markLoaded, true)
  document.addEventListener('error', markLoaded, true)
}

/*
 * Stages:
 *   idle      → (pulsing heart loader until the plate + heart images arrive) then plate + tilted heart,
 *               waiting for a tap anywhere
 *   inserting → heart flips and goes into the slot
 *   revealed  → plate shrinks, title appears, photo slip feeds out of the slot
 *   complete  → all animation done: "Scroll Down" indicator appears and scrolling is enabled
 */
export default function SaveTheDate() {
  const [stage, setStage] = useState('idle')
  // first screen waits for the plate + heart, so the intro never starts with missing pieces
  const ready = useImagesReady([plateImg, btnImg, ganeshImg])
  const revealed = stage === 'revealed' || stage === 'complete'
  const complete = stage === 'complete'

  const handleTap = () => {
    if (ready && stage === 'idle') setStage('inserting')
  }

  return (
    // Scroll container: overflow is locked until the intro animation completes
    <div className={`std ${complete ? 'std--scrollable' : ''} ${ready ? 'std--ready' : ''}`}>
      <section className="std__screen" onClick={handleTap} aria-label="Tap to open">
        <Ganesh />
        <Title intro={TITLE.intro} names={TITLE.names} visible={revealed} />

        <Loader visible={!ready} />

        <Plate ready={ready} revealed={revealed}>
          <PhotoSlip
            photos={SLIP_PHOTOS}
            visible={revealed}
            onShown={() => setStage('complete')}
          />
          {!revealed && (
            <HeartButton inserting={stage === 'inserting'} onInserted={() => setStage('revealed')} />
          )}
        </Plate>

        <ScrollHint visible={complete} />
      </section>

      {/* later pages' images start downloading only after the first screen is ready */}
      <LaterImagesAllowed.Provider value={ready}>
        <GentleReader heading={LETTER.heading} lines={LETTER.lines} />
        <WeddingDate {...WEDDING_DATE} />
        <Venue {...VENUE} />
        <Closing {...CLOSING} />
      </LaterImagesAllowed.Provider>
    </div>
  )
}
