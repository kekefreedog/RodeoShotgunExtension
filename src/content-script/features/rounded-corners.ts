/**
 * Rounded corners feature.
 *
 * Softens ShotGrid's sharp-cornered UI — project thumbnails, buttons, tabs,
 * the context menu, dialogs, the widget canvas title bar, media center
 * pills, and the toast/message box — by adding the `rdo-rounded-corners`
 * class to <body>. The CSS lives in index.scss, scoped to that class.
 */

const CLASS = 'rdo-rounded-corners'

export function enable(): void {
  document.body.classList.add(CLASS)
}

export function disable(): void {
  document.body.classList.remove(CLASS)
}
