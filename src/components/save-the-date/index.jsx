import { useEffect, useMemo, useState } from 'react'
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
import MusicButton from './MusicButton'
import useBackgroundMusic from './useBackgroundMusic'
import useImagesReady from './useImagesReady'
import { LaterImagesAllowed } from './imageGate'
import { getNamedContent, SLIP_PHOTOS, VENUE } from './content'
import plateImg from '../../assets/images/plate.webp'
import btnImg from '../../assets/images/btn.webp'
import ganeshImg from '../../assets/images/ganeshji.webp'
import './index.css'

const SONG_WAIT = 10000 // ms

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
export default function SaveTheDate({ side = 'groom' }) {
  // 'groom' (default) → "Anshul & Aishwarya", 'bride' (/b) → "Aishwarya & Anshul"
  const { pageTitle, TITLE, LETTER, WEDDING_DATE, CLOSING } = useMemo(
    () => getNamedContent(side),
    [side],
  )
  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  const [stage, setStage] = useState('idle')
  // first screen waits for the plate + heart, so the intro never starts with missing pieces
  const imagesReady = useImagesReady([plateImg, btnImg, ganeshImg])
  // song downloads at the same time; it starts on the "Click here" tap (browsers need a real tap for sound)
  const music = useBackgroundMusic()
  // "Click here" also waits for the song, so music starts the moment it's tapped —
  // but at most SONG_WAIT ms after the images, so a very slow/broken network never gets stuck
  const [songWaitOver, setSongWaitOver] = useState(false)
  useEffect(() => {
    if (!imagesReady || music.loaded) return
    const t = setTimeout(() => setSongWaitOver(true), SONG_WAIT)
    return () => clearTimeout(t)
  }, [imagesReady, music.loaded])
  const ready = imagesReady && (music.loaded || songWaitOver)
  // later pages' images download after the first screen + song (or once the guest has tapped)
  const laterImagesAllowed = (imagesReady && music.loaded) || stage !== 'idle'
  const revealed = stage === 'revealed' || stage === 'complete'
  const complete = stage === 'complete'

  const handleTap = () => {
    if (ready && stage === 'idle') {
      setStage('inserting')
      music.start()
    }
  }

  return (
    // Scroll container: overflow is locked until the intro animation completes
    <div className={`std ${complete ? 'std--scrollable' : ''} ${ready ? 'std--ready' : ''}`}>
      <section className="std__screen" onClick={handleTap} aria-label="Tap to open">
        <Ganesh />
        <Title intro={TITLE.intro} names={TITLE.names} visible={revealed} />

        <Loader visible={!ready} />

        <Plate ready={ready} revealed={revealed}>
          <PhotoSlip photos={SLIP_PHOTOS} visible={revealed} onShown={() => setStage('complete')} />
          {!revealed && (
            <HeartButton
              inserting={stage === 'inserting'}
              onInserted={() => setStage('revealed')}
            />
          )}
        </Plate>

        <ScrollHint visible={complete} />
      </section>

      {/* floating stop / start button, shown from the moment the music starts */}
      <MusicButton visible={stage !== 'idle'} playing={music.playing} onToggle={music.toggle} />

      {/* later pages' images start downloading only after the first screen and the song */}
      <LaterImagesAllowed.Provider value={laterImagesAllowed}>
        <GentleReader heading={LETTER.heading} lines={LETTER.lines} />
        <WeddingDate {...WEDDING_DATE} />
        <Venue {...VENUE} />
        <Closing {...CLOSING} />
      </LaterImagesAllowed.Provider>
    </div>
  )
}
