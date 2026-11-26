import './index.css'

/*
 * Button with a small line icon + label (icons in ./icons.jsx).
 *   variant 'dark'  → dark pink background, white text  (Calendar)
 *   variant 'light' → white background, dark pink text  (Get Direction)
 * Pass `href` to render it as a link (opens in a new tab).
 */
export default function IconButton({ icon, label, variant = 'dark', href, onClick }) {
  const className = `std__icon-btn std__icon-btn--${variant}`
  const content = (
    <>
      <span className="std__icon-btn-icon" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </>
  )

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  )
}
