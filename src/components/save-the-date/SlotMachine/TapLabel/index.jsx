import { CENTER_BUTTON, px, py } from '../geometry'
import './index.css'

/*
 * Makes the round button in the middle of the machine impossible to miss (designed for all ages):
 *   - a solid dark-pink badge with big white "TAP" on the button
 *   - before the first tap: a pulsing ring around it
 * Purely a hint: taps anywhere on the machine still pull the handle.
 */
export default function TapLabel({ pulsing }) {
  const { x, y } = CENTER_BUTTON
  const r = CENTER_BUTTON.r * 1.3 // badge a bit bigger than the button face, for easy reading
  return (
    <span
      className={`std__tap ${pulsing ? 'std__tap--pulse' : ''}`}
      style={{ left: px(x - r), top: py(y - r), width: px(r * 2) }}
      aria-hidden="true"
    >
      <span className="std__tap-text">TAP</span>
    </span>
  )
}
