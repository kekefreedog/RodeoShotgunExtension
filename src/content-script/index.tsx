/**
 * ShotGrid content script — orchestrator.
 *
 * Reads feature settings from browser.storage.sync on startup, enables the
 * active features, then listens for storage changes so the popup can toggle
 * features live without a page reload.
 */

import browser from 'webextension-polyfill'
import type { DevCopyFormat, FeatureSettings, Settings } from '../shared/types'
import { DEFAULT_SETTINGS } from '../shared/types'
import * as DarkTheme from './features/dark-theme'
import * as Logo      from './features/logo'
import * as QcGroups  from './features/qc-groups'
import * as NoQcBtn   from './features/no-qc-button'
import * as RecordNameFit from './features/record-name-fit'
import * as ProgressBar from './features/progress-bar'
import * as CopyCell   from './features/copy-cell'
import * as CopyFieldName from './features/copy-field-name'
import * as DevCopyCell from './features/dev-copy-cell'
import * as RoundedCorners from './features/rounded-corners'
import * as Secret     from './features/secret'
import './index.scss'

// ── Feature registry ──────────────────────────────────────────────────────

const FEATURES: Record<keyof FeatureSettings, { enable(): void; disable(): void }> = {
  darkTheme:          DarkTheme,
  logoReplacement:    Logo,
  qcGroupHiding:      QcGroups,
  noQcButton:         NoQcBtn,
  recordNameFit:      RecordNameFit,
  progressBar:        ProgressBar,
  copyCell:           CopyCell,
  copyFieldName:      CopyFieldName,
  devCopyCell:        DevCopyCell,
  roundedCorners:     RoundedCorners,
  secret:             Secret,
}

// ── Bootstrap ─────────────────────────────────────────────────────────────

async function init(): Promise<void> {
  const settings = await browser.storage.sync.get(DEFAULT_SETTINGS) as Settings
  // Options must be in place before the features that read them start
  DevCopyCell.setFormat(settings.devCopyFormat)
  applySettings(settings)
}

function applySettings(settings: FeatureSettings): void {
  for (const [key, feature] of Object.entries(FEATURES)) {
    settings[key as keyof FeatureSettings] ? feature.enable() : feature.disable()
  }
}

// ── Live toggle ───────────────────────────────────────────────────────────

browser.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return
  for (const [key, { newValue }] of Object.entries(changes)) {
    // Option keys carry a value, not an on/off flag — route them to their feature
    if (key === 'devCopyFormat') {
      DevCopyCell.setFormat(newValue as DevCopyFormat)
      continue
    }
    const feature = FEATURES[key as keyof FeatureSettings]
    if (!feature) continue
    newValue ? feature.enable() : feature.disable()
  }
})

init()
