/**
 * Darkest mode feature.
 *
 * Enables our enhanced dark theme by adding the `rdo-dark-enhanced` class to
 * <body>. The CSS in dark-theme.scss is scoped to `body.sg_dark_theme.rdo-dark-enhanced`,
 * so the overrides apply only when ShotGrid itself is also in dark mode.
 */

const CLASS = 'rdo-dark-enhanced'

export function enable(): void {
  document.body.classList.add(CLASS)
}

export function disable(): void {
  document.body.classList.remove(CLASS)
}
