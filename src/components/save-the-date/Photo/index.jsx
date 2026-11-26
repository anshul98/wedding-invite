import './index.css'

/*
 * A single photo on the slip. Shows a placeholder until `src` is provided.
 * `focus` (CSS object-position) picks which part of the photo stays in the frame.
 * `dot` adds a tiny dot in the photo's bottom-right corner.
 */
export default function Photo({ src, focus = '50% 50%', dot = false, label }) {
  if (!src) {
    return <div className="std__photo std__photo--placeholder">{label}</div>
  }
  const img = (
    <img
      src={src}
      alt={label}
      className="std__photo"
      style={{ objectPosition: focus }}
      draggable="false"
    />
  )
  if (!dot) return img
  return (
    <span className="std__photo-wrap">
      {img}
      <span className="std__photo-dot" aria-hidden="true" />
    </span>
  )
}
