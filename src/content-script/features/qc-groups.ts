/**
 * QC group hiding feature.
 *
 * Hides pipeline-step QC groups in the review player sidebar.
 * The MutationObserver re-hides groups whenever ShotGrid rebuilds the version
 * list (e.g. on shot change). On disable() all hidden rows are restored.
 */

export const QC_GROUPS_TO_HIDE = [
  'QC IO',
  'QC IO (S)',
  'QC BMM (S)',
  'QC FX (S)',
  'QC Layout (S)',
  'QC Animation (S)',
  'QC CFX (S)',
]

const hiddenRows: HTMLElement[] = []
let observer: MutationObserver | null = null

function hideQcGroups(): void {
  const versionsMain = document.querySelector<HTMLDivElement>('.sg.vbox.versions_main.sg_scroll_area')
  if (!versionsMain) return

  for (const groupName of versionsMain.querySelectorAll('.items .group_name')) {
    if (!QC_GROUPS_TO_HIDE.includes(groupName.textContent ?? '')) continue
    const row = groupName.parentElement?.parentElement?.parentElement as HTMLElement | null
    if (row && row.style.display !== 'none') {
      hiddenRows.push(row)
      row.style.display = 'none'
    }
  }
}

export function enable(): void {
  if (observer) return // already running

  observer = new MutationObserver(hideQcGroups)
  observer.observe(document, { childList: true, subtree: true })
  hideQcGroups() // run immediately in case player is already open
}

export function disable(): void {
  observer?.disconnect()
  observer = null

  for (const row of hiddenRows) {
    row.style.display = ''
  }
  hiddenRows.length = 0
}
