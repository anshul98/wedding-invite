const HEART =
  'M12 21s-7.5-4.6-10-9.3C0 7.8 2.2 3 6.6 3c2.4 0 4 1.3 5.4 3.2C13.4 4.3 15 3 17.4 3 21.8 3 24 7.8 22 11.7 19.5 16.4 12 21 12 21z'

export function SolidHeart({ className, color = 'currentColor' }) {
  return (
    <svg className={className} viewBox="0 0 24 22" aria-hidden="true">
      <path d={HEART} fill={color} />
    </svg>
  )
}

export function OutlineHeart({ className, color = 'currentColor' }) {
  return (
    <svg className={className} viewBox="-1 -1 26 24" aria-hidden="true">
      <path d={HEART} fill="none" stroke={color} strokeWidth="1.7" />
    </svg>
  )
}
