import { useCallback, useEffect, useRef, useState } from 'react'
// trimmed, lighter copy of song.mp3: 0:11 → 1:19 only, 64 kbps (~0.5 MB instead of 9 MB); it loops
import songUrl from '../../assets/audio/song-loop.mp3'

const VOLUME = 0.6 // 0–1 (iPhones ignore this and use the phone's volume)
const FADE_IN = 2 // seconds

/*
 * The whole song is downloaded up front (fetch → in-memory file), so it plays the instant
 * "Click here" is tapped, even on slow networks. `loaded` turns true once it has downloaded
 * (or failed, so nothing waits forever) — index.jsx keeps "Click here" hidden until then.
 *
 * Browsers only allow sound after a real tap, so `start` is called from the "Click here" tap.
 * If the guest taps before the download finished (only possible after the 10 s fallback),
 * the song streams from the network instead.
 * Pauses while the app/tab is in the background and resumes on return (unless the guest muted it).
 */
export default function useBackgroundMusic() {
  const audioRef = useRef(null)
  const blobUrlRef = useRef(null) // the downloaded song, once ready
  const abortRef = useRef(null)
  const wantsPlayRef = useRef(false) // false once the guest stops it
  const fadeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // download the song as soon as the page opens
  useEffect(() => {
    const controller = new AbortController()
    abortRef.current = controller
    fetch(songUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.blob()
      })
      .then((blob) => {
        blobUrlRef.current = URL.createObjectURL(blob)
      })
      .catch(() => {}) // failed → plays straight from the network (or not at all)
      .finally(() => !controller.signal.aborted && setLoaded(true))
    return () => controller.abort()
  }, [])

  const getAudio = () => {
    if (audioRef.current) return audioRef.current
    // not downloaded yet → stop the download and stream instead, so the two don't compete
    if (!blobUrlRef.current) abortRef.current?.abort()
    const audio = new Audio(blobUrlRef.current || songUrl)
    audio.loop = true
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))
    audio.addEventListener('error', () => setPlaying(false)) // song couldn't load: record stops spinning
    audioRef.current = audio
    return audio
  }

  const play = useCallback(() => {
    const audio = getAudio()
    wantsPlayRef.current = true
    clearInterval(fadeRef.current)
    audio.volume = 0
    audio.play().catch(() => setPlaying(false))
    const steps = 20
    let i = 0
    fadeRef.current = setInterval(() => {
      i += 1
      audio.volume = Math.min(VOLUME, (VOLUME * i) / steps)
      if (i >= steps) clearInterval(fadeRef.current)
    }, (FADE_IN * 1000) / steps)
  }, [])

  const toggle = useCallback(() => {
    const audio = getAudio()
    if (audio.paused) play()
    else {
      wantsPlayRef.current = false
      audio.pause()
    }
  }, [play])

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) audio.pause()
      else if (wantsPlayRef.current) audio.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      clearInterval(fadeRef.current)
      audioRef.current?.pause()
    }
  }, [])

  return { playing, loaded, start: play, toggle }
}
