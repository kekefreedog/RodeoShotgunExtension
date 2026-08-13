import React, { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'
import type { FeatureOptions, FeatureSettings, Settings } from '../shared/types'
import { DEFAULT_SETTINGS, FEATURE_DEFS, FEATURE_CATEGORIES } from '../shared/types'
import Switch from './Switch'
import './style.scss'

export default function Popup() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    browser.storage.sync.get(DEFAULT_SETTINGS).then(stored => {
      setSettings(stored as Settings)
      setReady(true)
    })
  }, [])

  async function toggle(key: keyof FeatureSettings): Promise<void> {
    const updated = { ...settings, [key]: !settings[key] }
    setSettings(updated)
    await browser.storage.sync.set(updated)
  }

  async function setOption(key: keyof FeatureOptions, value: string): Promise<void> {
    // Values come from the option's own `choices`, so they are always valid
    const updated = { ...settings, [key]: value } as Settings
    setSettings(updated)
    await browser.storage.sync.set(updated)
  }

  if (!ready) return null

  return (
    <div className="popup">

      <header className="popup-header">
        <img
          className="popup-logo"
          src={browser.runtime.getURL('logo-mark.png')}
          alt="Rodeo FX"
        />
        <div>
          <h1 className="popup-name">ShotGrid Rodeo FX</h1>
          <span className="popup-sub">UI Enhancements</span>
        </div>
      </header>

      <ul className="feature-list">
        {FEATURE_CATEGORIES.map(category => {
          const features = FEATURE_DEFS.filter(f => f.category === category)
          if (features.length === 0) return null
          return (
            <li key={category} className="feature-group">
              <span className="feature-category">{category}</span>
              <ul className="feature-sublist">
                {features.map(({ key, label, description, option }) => (
                  <li key={key} className="feature-item">
                    <div className="feature-row">
                      <div className="feature-info">
                        <span className="feature-label">{label}</span>
                        <span className="feature-desc">{description}</span>
                      </div>
                      <Switch
                        checked={settings[key]}
                        onChange={() => toggle(key)}
                        label={`${settings[key] ? 'Disable' : 'Enable'} ${label}`}
                      />
                    </div>
                    {option && settings[key] && (
                      <label className="feature-option">
                        <span className="feature-option-label">{option.label}</span>
                        <select
                          className="feature-select"
                          value={String(settings[option.key])}
                          onChange={e => setOption(option.key, e.target.value)}
                        >
                          {option.choices.map(choice => (
                            <option key={choice.value} value={choice.value}>{choice.label}</option>
                          ))}
                        </select>
                      </label>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>

    </div>
  )
}
