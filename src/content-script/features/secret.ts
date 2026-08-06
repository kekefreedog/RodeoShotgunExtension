/**
 * "Secret" easter-egg feature.
 *
 * Clicking a user's avatar (`.sg_user_thumb[entity_type="HumanUser"]`) 10 times
 * fires a party.js confetti burst from the thumbnail, then resets the counter
 * so the surprise can be triggered again.
 *
 * Uses a single delegated click listener on `document` rather than binding to
 * each thumbnail directly, since ShotGrid re-renders these elements constantly
 * as a SPA — delegation needs no MutationObserver and is trivially reversible.
 */

import party from 'party-js'

const AVATAR_SELECTOR = '.sg_user_thumb[entity_type="HumanUser"]'
const CLICKS_REQUIRED = 10

let clickCount = 0
let listener: ((e: MouseEvent) => void) | null = null

function onClick(e: MouseEvent): void {
  const avatar = (e.target as HTMLElement).closest<HTMLElement>(AVATAR_SELECTOR)
  if (!avatar) return

  clickCount++
  if (clickCount < CLICKS_REQUIRED) return

  clickCount = 0
  party.confetti(avatar, { count: party.variation.range(40, 60) })
}

export function enable(): void {
  if (listener) return
  listener = onClick
  document.addEventListener('click', listener)
}

export function disable(): void {
  if (listener) document.removeEventListener('click', listener)
  listener = null
  clickCount = 0
}
