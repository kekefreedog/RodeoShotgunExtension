/**
 * Record-name auto-fit feature (review player header).
 *
 * Long file names in the player's `.session_info` header (e.g.
 * `annot_version_4761587.39.png`) blow past the space available and either wrap
 * or get clipped. When the name's text is wider than MAX_WIDTH, its font size is
 * scaled down proportionally (never below MIN_FONT) so it fits on one line.
 *
 * The name's rendered box is block-level — it fills its container — so its own
 * width tells us nothing about the text. Instead the text width is measured with
 * a canvas using the element's computed font, which is exact and layout-free.
 *
 * The player swaps the record name in place while navigating versions, so a
 * MutationObserver re-fits on any text/child change. Attributes are deliberately
 * *not* observed: the fix itself writes an inline `font-size`, and observing it
 * would loop.
 */

const SELECTOR   = '.session_info .record_name'
const MAX_WIDTH  = 500 // px of text before shrinking kicks in
const MIN_FONT   = 9   // px floor, so very long names stay readable

let observer: MutationObserver | null = null
let frame:    number | null = null
let canvas:   HTMLCanvasElement | null = null

/** Width the element's text would take on a single line, at its current font. */
function textWidth(el: HTMLElement): number {
  canvas ??= document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 0

  const s = getComputedStyle(el)
  ctx.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`
  return ctx.measureText(el.textContent ?? '').width
}

function fit(el: HTMLElement): void {
  // Measure at the natural size, not at whatever we shrank it to last time
  el.style.fontSize = ''
  const text = (el.textContent ?? '').trim()
  if (!text) return

  const base  = parseFloat(getComputedStyle(el).fontSize)
  const width = textWidth(el)
  if (!base || width <= MAX_WIDTH) return

  el.style.fontSize = `${Math.max(MIN_FONT, base * MAX_WIDTH / width).toFixed(2)}px`
}

function fitAll(): void {
  for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) fit(el)
}

/** Coalesce the bursts of mutations a player navigation produces into one pass. */
function scheduleFit(): void {
  if (frame !== null) return
  frame = requestAnimationFrame(() => {
    frame = null
    fitAll()
  })
}

export function enable(): void {
  if (observer) return // already running

  observer = new MutationObserver(scheduleFit)
  observer.observe(document.body, { childList: true, characterData: true, subtree: true })
  fitAll()
}

export function disable(): void {
  observer?.disconnect()
  observer = null
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null

  for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) el.style.fontSize = ''
}
