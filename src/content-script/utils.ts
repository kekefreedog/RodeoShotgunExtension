import browser from 'webextension-polyfill'

/** Returns the extension URL for the Rodeo FX logo matching the current theme. */
export function getLogoUrl(dark: boolean): string {
  return browser.runtime.getURL(dark ? 'logo-white.png' : 'logo-black.png')
}

/**
 * Polls for DOM elements matching `selector`, retrying up to `maxAttempts` times.
 * Needed because ShotGrid is a SPA that renders content asynchronously.
 */
export function waitForElements(
  selector: string,
  callback: (els: NodeListOf<HTMLElement>) => void,
  interval = 100,
  maxAttempts = 10
): void {
  let attempts = 0
  function check() {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (elements.length > 0) {
      callback(elements)
      return
    }
    if (attempts < maxAttempts) {
      attempts++
      setTimeout(check, interval)
    }
  }
  check()
}
