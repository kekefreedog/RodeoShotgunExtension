/**
 * Copy field-name button feature.
 *
 * Adds a small copy icon to column header cells, next to the display name,
 * to copy the field's technical/API name (from its `field` attribute) —
 * handy for scripting/API work.
 *
 * Same lazy-inject-on-hover / delegated-click pattern as the copy-cell
 * feature: headers are injected on `mouseover`, copy is handled by a single
 * delegated `click` listener, and all listeners use the capture phase so a
 * click on our icon can stop propagation before ShotGrid's column-sort
 * trigger kicks in.
 */

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const ICON_CLASS = 'rdo-copy-field-icon'
const BODY_CLASS = 'rdo-copy-field-name'
const HEADER_SELECTOR = 'td.heading[field]'

let onMouseOver: ((e: Event) => void) | null = null
let onMouseDown: ((e: Event) => void) | null = null
let onClick:     ((e: Event) => void) | null = null

function injectIcon(header: HTMLElement): void {
  if (header.querySelector(`.${ICON_CLASS}`)) return

  const fieldName = header.getAttribute('field')
  if (!fieldName) return

  const icon = document.createElement('div')
  icon.className = ICON_CLASS
  icon.title = 'Copy field name'
  // Appended straight onto the <td> (not into the flex name row) and
  // absolutely positioned to its bottom-right corner (see CSS) — this keeps
  // it anchored to the cell's actual bounds, unaffected by ShotGrid's own
  // info-tooltip icon floating at whatever height a wrapped display name
  // pushes it to.
  header.appendChild(icon)
}

export function enable(): void {
  if (onClick) return // already running

  onMouseOver = e => {
    const header = (e.target as HTMLElement | null)?.closest?.(HEADER_SELECTOR) as HTMLElement | null
    if (header) injectIcon(header)
  }

  // Block ShotGrid's column-sort trigger from firing when our icon is pressed
  onMouseDown = e => {
    if ((e.target as HTMLElement | null)?.closest?.(`.${ICON_CLASS}`)) {
      e.stopPropagation()
    }
  }

  onClick = e => {
    const icon = (e.target as HTMLElement | null)?.closest?.(`.${ICON_CLASS}`) as HTMLElement | null
    if (!icon) return
    e.stopPropagation()
    e.preventDefault()

    const header = icon.closest(HEADER_SELECTOR) as HTMLElement | null
    const fieldName = header?.getAttribute('field') ?? ''

    navigator.clipboard.writeText(fieldName).then(
      () => Toastify({ text: 'Field name copied! ✅' }).showToast(),
      () => Toastify({ text: 'Copy failed 🔴' }).showToast()
    )
  }

  document.body.classList.add(BODY_CLASS)
  document.addEventListener('mouseover', onMouseOver, true)
  document.addEventListener('mousedown', onMouseDown, true)
  document.addEventListener('click',     onClick,     true)
}

export function disable(): void {
  document.body.classList.remove(BODY_CLASS)
  if (onMouseOver) document.removeEventListener('mouseover', onMouseOver, true)
  if (onMouseDown) document.removeEventListener('mousedown', onMouseDown, true)
  if (onClick)     document.removeEventListener('click',     onClick,     true)
  onMouseOver = onMouseDown = onClick = null

  for (const icon of document.querySelectorAll(`.${ICON_CLASS}`)) icon.remove()
}
