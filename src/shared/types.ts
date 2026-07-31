/** Settings persisted in browser.storage.sync. */
export interface FeatureSettings {
  darkTheme:       boolean
  logoReplacement: boolean
  qcGroupHiding:   boolean
  noQcButton:      boolean
  progressBar:     boolean
  copyCell:        boolean
}

/** All features are enabled by default. */
export const DEFAULT_SETTINGS: FeatureSettings = {
  darkTheme:       true,
  logoReplacement: true,
  qcGroupHiding:   true,
  noQcButton:      true,
  progressBar:     true,
  copyCell:        true,
}

/** Feature categories, in the order they appear in the popup. */
export const FEATURE_CATEGORIES = ['Appearance', 'Review player', 'Grid'] as const
export type FeatureCategory = typeof FEATURE_CATEGORIES[number]

/** Human-readable metadata for each feature, used by the popup UI. */
export const FEATURE_DEFS: Array<{
  key:         keyof FeatureSettings
  label:       string
  description: string
  category:    FeatureCategory
}> = [
  {
    key:         'darkTheme',
    label:       'Darkest Mode',
    description: 'Deeper blacks and blue accent on top of ShotGrid dark theme',
    category:    'Appearance',
  },
  {
    key:         'logoReplacement',
    label:       'Logo Replacement',
    description: 'Replaces the ShotGrid logo with the Rodeo FX logo',
    category:    'Appearance',
  },
  {
    key:         'progressBar',
    label:       'Loading Progress Bar',
    description: 'Replaces the loading spinner overlay with a slim progress bar at the bottom of the frame',
    category:    'Appearance',
  },
  {
    key:         'qcGroupHiding',
    label:       'Hide QC Groups',
    description: 'Hides QC pipeline-step groups in the review player',
    category:    'Review player',
  },
  {
    key:         'noQcButton',
    label:       'No QC Versions Button',
    description: 'Injects a filter-copy button into the review player',
    category:    'Review player',
  },
  {
    key:         'copyCell',
    label:       'Copy Cell Button',
    description: 'Adds a copy icon on hover of grid cells to copy their text',
    category:    'Grid',
  },
]
