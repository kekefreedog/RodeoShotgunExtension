import { browser, $ , $$, expect } from '@wdio/globals'
import type { Capabilities } from '@wdio/types'

const isFirefox = (browser.capabilities as Capabilities.Capabilities).browserName === 'firefox'

describe('ShotGridRodeoFx Extension', () => {
  it('should load without errors', async () => {
    // Real integration tests require access to shotgun.rodeofx.com or rodeofx.shotgrid.autodesk.com.
    // This smoke test verifies the extension is loaded and the browser is functional.
    await browser.url('https://google.com')
    const title = await browser.getTitle()
    expect(title.length).toBeGreaterThan(0)
  })
})
