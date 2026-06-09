/**
 * "No QC Versions" button feature.
 *
 * Injects a button into the review player that copies a pre-built filter string
 * to the clipboard — letting reviewers instantly hide all QC pipeline steps.
 *
 * The button is injected once (guarded by `injected` flag) and fully removed
 * on disable(). The MutationObserver is shared with qc-groups; this module
 * manages its own observer so it can be independently toggled.
 */

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import ClipboardJS from 'clipboard'
import { QC_GROUPS_TO_HIDE } from './qc-groups'

// Filter string excludes qcRender tags AND every QC pipeline-step group
const FILTER_STRING = `-qcRender AND NOT ("${QC_GROUPS_TO_HIDE.join('" AND "')}")`

let injected  = false
let button:    HTMLButtonElement | null = null
let clipboard: ClipboardJS | null = null
let observer:  MutationObserver | null = null

function tryInject(): void {
  if (injected) return

  const input = document.querySelector<HTMLInputElement>(
    '.sgw_review_app_related_versions_menus_wrapper .quick_filter_input_container input'
  )
  if (!input || input.value) return

  const topPane = document.querySelector<HTMLElement>('.sgw_review_app_related_versions_top_pane')
  if (!topPane) return

  injected = true

  topPane.style.display        = 'flex'
  topPane.style.justifyContent = 'space-between'
  topPane.style.alignItems     = 'center'

  button = document.createElement('button')
  button.classList.add('rdo-btn-a')
  button.textContent = 'No QC Versions'

  // ClipboardJS created once per button to avoid listener accumulation
  clipboard = new ClipboardJS(button, { text: () => FILTER_STRING })
  const toastOk   = Toastify({ text: 'Text copied! ✅' })
  const toastFail = Toastify({ text: 'Text not copied! 🔴' })

  clipboard.on('success', e => { toastOk.showToast(); e.clearSelection() })
  clipboard.on('error',   () => toastFail.showToast())

  topPane.appendChild(button)
  tippy(button, {
    content:   'Please ensure Pipeline Steps is enabled on search filter',
    placement: 'bottom',
  })
}

export function enable(): void {
  if (observer) return

  observer = new MutationObserver(tryInject)
  observer.observe(document, { childList: true, subtree: true })
  tryInject() // run immediately if player is already open
}

export function disable(): void {
  observer?.disconnect()
  observer = null

  clipboard?.destroy()
  clipboard = null

  button?.remove()
  button = null

  injected = false
}
