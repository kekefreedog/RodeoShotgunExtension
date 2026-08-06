/** Settings persisted in browser.storage.sync. */
export interface FeatureSettings {
  darkTheme:         boolean
  logoReplacement:   boolean
  qcGroupHiding:     boolean
  noQcButton:        boolean
  progressBar:       boolean
  copyCell:          boolean
  copyFieldName:     boolean
  roundedCorners:    boolean
  secret:            boolean
}

/** All features are enabled by default. */
export const DEFAULT_SETTINGS: FeatureSettings = {
  darkTheme:         true,
  logoReplacement:   true,
  qcGroupHiding:     true,
  noQcButton:        true,
  progressBar:       true,
  copyCell:          true,
  copyFieldName:     true,
  roundedCorners:    true,
  secret:            true,
}

/** Feature categories, in the order they appear in the popup. */
export const FEATURE_CATEGORIES = ['Appearance', 'Review player', 'Grid', 'Fun'] as const
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
    key:         'roundedCorners',
    label:       'Rounded Corners',
    description: 'Softens ShotGrid\'s sharp corners across cards, buttons, tabs, menus, dialogs and the toast/message box',
    category:    'Appearance',
  },
  {
    key:         'copyCell',
    label:       'Copy Cell Button',
    description: 'Adds a copy icon on hover of grid cells to copy their text',
    category:    'Grid',
  },
  {
    key:         'copyFieldName',
    label:       'Copy Field Name Button',
    description: 'Adds a copy icon on hover of column headers to copy the field\'s technical/API name',
    category:    'Grid',
  },
  {
    key:         'secret',
    label:       'Secret',
    description: 'Click a user\'s avatar 10 times for a little surprise',
    category:    'Fun',
  },
]
