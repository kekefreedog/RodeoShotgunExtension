/**
 * Copy-cell button feature.
 *
 * Adds a small copy icon (next to ShotGrid's hover edit pencil) to every
 * editable grid cell. Clicking it copies the cell's text to the clipboard.
 *
 * ShotGrid grids are virtualized — cells are created and destroyed constantly
 * as the user scrolls — so injecting an icon into every cell up front would be
 * wasteful. Instead the icon is injected lazily on `mouseover` of a cell, and
 * the copy is handled by a single delegated `click` listener. Recycled cells
 * simply re-inject on the next hover.
 *
 * All listeners use the capture phase so a click on our icon can stop
 * propagation before ShotGrid's single-click cell editor kicks in.
 */

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const ICON_CLASS = 'rdo-copy-icon'
const BODY_CLASS = 'rdo-copy-cell'
const CELL_SELECTOR = 'td.sg_cell'

let onMouseOver: ((e: Event) => void) | null = null
let onMouseDown: ((e: Event) => void) | null = null
let onClick:     ((e: Event) => void) | null = null

function injectIcon(cell: HTMLElement): void {
  if (cell.querySelector(`.${ICON_CLASS}`)) return
  // Checkboxes have no copyable text — sg_tip just carries "true"/"false", not real content
  if (cell.getAttribute('data_type') === 'checkbox') return
  // Only cells with actual text are worth a copy button (skips empty / thumbnail cells)
  if (!cellText(cell)) return

  const icon = document.createElement('div')
  icon.className = ICON_CLASS
  icon.title = 'Copy cell text'
  // On short cells (<= 36px) ShotGrid shows its own hover icon at the
  // bottom-right; shift our icon left so it doesn't cover it.
  if (cell.offsetHeight <= 36) icon.classList.add(`${ICON_CLASS}--shift`)
  cell.appendChild(icon)
}

function cellText(cell: HTMLElement): string {
  const text = (cell.querySelector('.sg_cell_content')?.textContent ?? '').trim()
  if (text) return text
  // Icon-only cells (e.g. status) carry their value in the sg_tip attribute
  return (cell.getAttribute('sg_tip') ?? '').trim()
}

export function enable(): void {
  if (onClick) return // already running

  onMouseOver = e => {
    const cell = (e.target as HTMLElement | null)?.closest?.(CELL_SELECTOR) as HTMLElement | null
    if (cell) injectIcon(cell)
  }

  // Block ShotGrid's cell-edit trigger from firing when our icon is pressed
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

    const cell = icon.closest(CELL_SELECTOR) as HTMLElement | null
    const text = cell ? cellText(cell) : ''

    navigator.clipboard.writeText(text).then(
      () => Toastify({ text: 'Cell copied! ✅' }).showToast(),
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
