/**
 * Logo replacement feature.
 *
 * Replaces the ShotGrid / Autodesk logo with the Rodeo FX logo on:
 *   - The login page hero image
 *   - The persistent nav bar logo
 *
 * Uses inline styles so all changes can be fully reversed on disable().
 * The CSS still sets `opacity: 0` on the login <img> to prevent a flash of the
 * original logo before JS runs; when this feature is disabled we explicitly set
 * opacity back to 1 to reveal the original image.
 */

import { getLogoUrl, waitForElements } from '../utils'

// Track every element we modify so disable() can reverse them exactly.
const loginImgs: Array<{ el: HTMLImageElement; originalSrc: string }> = []
const loginDivs: HTMLElement[] = []
const navAnchors: HTMLElement[] = []

export function enable(): void {
  const dark = document.body.classList.contains('sg_dark_theme')
  const url  = getLogoUrl(dark)

  // Login page — hide original <img> (keep opacity 0 so no flash),
  // then show our logo via background-image on the parent div.
  waitForElements('.sg_reset_html .login_page main img', els => {
    els.forEach(el => {
      if (!(el instanceof HTMLImageElement)) return
      loginImgs.push({ el, originalSrc: el.src })
      el.src          = url
      el.style.opacity = '0'
    })
  })

  waitForElements('.login_page main > div:first-child', els => {
    els.forEach(el => {
      loginDivs.push(el)
      el.style.background = `center / contain no-repeat url('${url}')`
    })
  })

  // Nav bar — replace the CSS background-image on the <a> tag and hide the
  // legacy <img> that ShotGrid keeps inside it.
  waitForElements('.nav_item.sg_logo a', els => {
    els.forEach(el => {
      navAnchors.push(el)
      el.querySelectorAll<HTMLImageElement>('img').forEach(img => (img.style.opacity = '0'))
      el.style.background = `center / contain no-repeat url('${url}')`
      el.style.height     = 'inherit'
      el.style.width      = '135px'
    })
  })
}

export function disable(): void {
  // Restore login imgs — set opacity to '1' so original ShotGrid img is visible
  // even though the CSS still has opacity: 0 via the class selector.
  for (const { el, originalSrc } of loginImgs) {
    el.src          = originalSrc
    el.style.opacity = '1'
  }
  loginImgs.length = 0

  for (const el of loginDivs) {
    el.style.background = ''
  }
  loginDivs.length = 0

  for (const el of navAnchors) {
    el.querySelectorAll<HTMLImageElement>('img').forEach(img => (img.style.opacity = ''))
    el.style.background = ''
    el.style.height     = ''
    el.style.width      = ''
  }
  navAnchors.length = 0
}
