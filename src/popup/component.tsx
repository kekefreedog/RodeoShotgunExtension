import React, { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'
import type { FeatureSettings } from '../shared/types'
import { DEFAULT_SETTINGS, FEATURE_DEFS } from '../shared/types'
import Switch from './Switch'
import './style.scss'

export default function Popup() {
  const [settings, setSettings] = useState<FeatureSettings>(DEFAULT_SETTINGS)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    browser.storage.sync.get(DEFAULT_SETTINGS).then(stored => {
      setSettings(stored as FeatureSettings)
      setReady(true)
    })
  }, [])

  async function toggle(key: keyof FeatureSettings): Promise<void> {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    await browser.storage.sync.set(updated)
  }

  if (!ready) return null

  return (
    <div className="popup">

      <header className="popup-header">
        <img
          className="popup-logo"
          src={browser.runtime.getURL('logo-white.png')}
          alt="Rodeo FX"
        />
        <div>
          <h1 className="popup-name">ShotGrid Rodeo FX</h1>
          <span className="popup-sub">UI Enhancements</span>
        </div>
      </header>

      <ul className="feature-list">
        {FEATURE_DEFS.map(({ key, label, description }) => (
          <li key={key} className="feature-item">
            <div className="feature-info">
              <span className="feature-label">{label}</span>
              <span className="feature-desc">{description}</span>
            </div>
            <Switch
              checked={settings[key]}
              onChange={() => toggle(key)}
              label={`${settings[key] ? 'Disable' : 'Enable'} ${label}`}
            />
          </li>
        ))}
      </ul>

    </div>
  )
}
