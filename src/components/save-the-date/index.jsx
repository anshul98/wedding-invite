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
import { CLOSING, LETTER, SLIP_PHOTOS, TITLE, VENUE, WEDDING_DATE } from './content'
import './index.css'

/*
 * Stages:
 *   idle      → plate + tilted heart, waiting for a tap anywhere
 *   inserting → heart flips and goes into the slot
 *   revealed  → plate shrinks, title appears, photo slip feeds out of the slot
 *   complete  → all animation done: "Scroll Down" indicator appears and scrolling is enabled
 */
export default function SaveTheDate() {
  const [stage, setStage] = useState('idle')
  const revealed = stage === 'revealed' || stage === 'complete'
  const complete = stage === 'complete'

  const handleTap = () => {
    if (stage === 'idle') setStage('inserting')
  }

  return (
    // Scroll container: overflow is locked until the intro animation completes
    <div className={`std ${complete ? 'std--scrollable' : ''}`}>
      <section className="std__screen" onClick={handleTap} aria-label="Tap to open">
        <Ganesh />
        <Title intro={TITLE.intro} names={TITLE.names} visible={revealed} />

        <Plate revealed={revealed}>
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

      <GentleReader heading={LETTER.heading} lines={LETTER.lines} />
      <WeddingDate {...WEDDING_DATE} />
      <Venue {...VENUE} />
      <Closing {...CLOSING} />
    </div>
  )
}
