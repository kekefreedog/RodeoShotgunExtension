/**
 * Dev-copy button feature (grid cells).
 *
 * Adds a `</>` icon just above the copy-cell icon on grid cells that carry an
 * entity reference — i.e. cells with both `record_type` and `record_id`
 * attributes. Clicking it copies that entity as a code snippet in the language
 * picked in the popup:
 *
 *   python      {"type": "Version", "id": 4772452}
 *   javascript  { type: 'Version', id: 4772452 }
 *   json        {"type": "Version", "id": 4772452}
 *   yaml        type: Version\nid: 4772452
 *   php         ['type' => 'Version', 'id' => 4772452]
 *
 * Note this copies the *row's* entity (the record the cell belongs to), not the
 * cell's own value — so on the example `sg_task` cell of a Version row it yields
 * the Version, which is what a script needs to address the record.
 *
 * Injection and click handling mirror copy-cell.ts: lazily inject on hover
 * (ShotGrid grids are virtualized) and handle clicks with one delegated capture
 * listener so the cell's single-click editor never sees them.
 */

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import type { DevCopyFormat } from '../../shared/types'

const ICON_CLASS = 'rdo-dev-copy-icon'
const BODY_CLASS = 'rdo-dev-copy-cell'
const CELL_SELECTOR = 'td.sg_cell[record_type][record_id]'

let format: DevCopyFormat = 'python'

let onMouseOver: ((e: Event) => void) | null = null
let onMouseDown: ((e: Event) => void) | null = null
let onClick:     ((e: Event) => void) | null = null

/** Called by the orchestrator on startup and whenever the popup changes it. */
export function setFormat(next: DevCopyFormat): void {
  format = next
}

interface Entity {
  type: string
  id:   number
}

function cellEntity(cell: HTMLElement): Entity | null {
  const type = (cell.getAttribute('record_type') ?? '').trim()
  const id   = Number(cell.getAttribute('record_id'))
  if (!type || !Number.isFinite(id) || id <= 0) return null
  return { type, id }
}

function serialize({ type, id }: Entity, lang: DevCopyFormat): string {
  switch (lang) {
    case 'python':     return `{"type": "${type}", "id": ${id}}`
    case 'javascript': return `{ type: '${type}', id: ${id} }`
    case 'json':       return `{"type": "${type}", "id": ${id}}`
    case 'yaml':       return `type: ${type}\nid: ${id}`
    case 'php':        return `['type' => '${type}', 'id' => ${id}]`
  }
}

function injectIcon(cell: HTMLElement): void {
  if (cell.querySelector(`.${ICON_CLASS}`)) return
  if (!cellEntity(cell)) return

  const icon = document.createElement('div')
  icon.className = ICON_CLASS
  icon.title = 'Copy entity as code snippet'
  // Stacking above the copy icon needs ~33px of height; on short cells there is
  // no room, so sit beside it instead (see index.scss).
  if (cell.offsetHeight <= 36) icon.classList.add(`${ICON_CLASS}--inline`)
  cell.appendChild(icon)
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

    const cell   = icon.closest(CELL_SELECTOR) as HTMLElement | null
    const entity = cell ? cellEntity(cell) : null
    if (!entity) return

    const snippet = serialize(entity, format)
    navigator.clipboard.writeText(snippet).then(
      () => Toastify({ text: `${snippet} copied! 🧑‍💻` }).showToast(),
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
