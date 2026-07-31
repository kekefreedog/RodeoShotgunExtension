/**
 * Loading progress-bar feature.
 *
 * Restyles ShotGrid's loading spinner overlay into a slim indeterminate
 * progress bar pinned to the bottom of the loading frame. This is purely
 * CSS-driven: enabling adds the `rdo-progress-bar` class to <body>, and the
 * scoped rules in index.scss take over. ShotGrid already toggles the overlay's
 * `visibility` (visible while loading, hidden when done), so the bar appears
 * and disappears automatically with no JS.
 */

const CLASS = 'rdo-progress-bar'

export function enable(): void {
  document.body.classList.add(CLASS)
}

export function disable(): void {
  document.body.classList.remove(CLASS)
}
