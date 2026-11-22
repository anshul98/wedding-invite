import './index.css'

/* A single photo on the slip. Shows a placeholder until `src` is provided. */
export default function Photo({ src, label }) {
  if (!src) {
    return <div className="std__photo std__photo--placeholder">{label}</div>
  }
  return <img src={src} alt={label} className="std__photo" draggable="false" />
}
