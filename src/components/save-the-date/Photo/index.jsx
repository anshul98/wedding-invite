import './index.css'

/*
 * A single photo on the slip. Shows a placeholder until `src` is provided.
 * `focus` (CSS object-position) picks which part of the photo stays in the frame.
 */
export default function Photo({ src, focus = '50% 50%', label }) {
  if (!src) {
    return <div className="std__photo std__photo--placeholder">{label}</div>
  }
  return (
    <img src={src} alt={label} className="std__photo" style={{ objectPosition: focus }} draggable="false" />
  )
}
