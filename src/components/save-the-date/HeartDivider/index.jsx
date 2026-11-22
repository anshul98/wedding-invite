import './index.css'

/* Horizontal line — small heart — line. Colour comes from `currentColor`. */
export default function HeartDivider({ className = '' }) {
  return (
    <div className={`std__heart-divider ${className}`} aria-hidden="true">
      <span className="std__heart-divider-line" />
      <svg className="std__heart-divider-heart" viewBox="0 0 24 22">
        <path d="M12 21s-7.5-4.6-10-9.3C0 7.8 2.2 3 6.6 3c2.4 0 4 1.3 5.4 3.2C13.4 4.3 15 3 17.4 3 21.8 3 24 7.8 22 11.7 19.5 16.4 12 21 12 21z" />
      </svg>
      <span className="std__heart-divider-line" />
    </div>
  )
}
