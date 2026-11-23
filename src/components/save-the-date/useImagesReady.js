import { useEffect, useState } from 'react'

/* true once every image URL in `srcs` has fully downloaded (or failed, so the page never gets stuck) */
export default function useImagesReady(srcs) {
  const [ready, setReady] = useState(false)
  const key = srcs.join('|')

  useEffect(() => {
    let cancelled = false
    Promise.all(
      key.split('|').map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image()
            img.onload = img.onerror = resolve
            img.src = src
          }),
      ),
    ).then(() => !cancelled && setReady(true))
    return () => {
      cancelled = true
    }
  }, [key])

  return ready
}
