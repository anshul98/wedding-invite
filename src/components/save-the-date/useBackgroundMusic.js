import { useCallback, useEffect, useRef, useState } from 'react'
// trimmed copy of song.mp3: 0:11 → 1:19 only (~1 MB instead of 9 MB); it loops back to 0:11
import songUrl from '../../assets/audio/song-loop.mp3'

const VOLUME = 0.6 // 0–1 (iPhones ignore this and use the phone's volume)
const FADE_IN = 2 // seconds

/*
 * Browsers only allow sound after a real tap, so `start` is called from the "Click here" heart tap.
 * Pauses while the app/tab is in the background and resumes on return (unless the guest muted it).
 */
export default function useBackgroundMusic(preload) {
  const audioRef = useRef(null)
  const wantsPlayRef = useRef(false) // false once the guest stops it
  const fadeRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // start downloading the song once the first screen is ready, so it doesn't slow the opening
  useEffect(() => {
    if (!preload || audioRef.current) return
    const audio = new Audio(songUrl)
    audio.loop = true
    audio.preload = 'auto'
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))
    audioRef.current = audio
  }, [preload])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
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
    const audio = audioRef.current
    if (!audio) return
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

  return { playing, start: play, toggle }
}
