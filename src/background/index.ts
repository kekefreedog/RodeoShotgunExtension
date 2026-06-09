/**
 * Background service worker (MV3).
 *
 * Runs as a non-persistent background context — it wakes on extension events
 * and terminates when idle. Currently used only to confirm installation;
 * extend here for cross-tab messaging, alarms, or fetch proxying if needed.
 */

import browser from 'webextension-polyfill'

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install')  console.log('[ShotGridRodeoFx] Extension installed.')
  if (reason === 'update')   console.log('[ShotGridRodeoFx] Extension updated.')
})
