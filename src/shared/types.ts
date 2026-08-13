/** Feature on/off flags persisted in browser.storage.sync. */
export interface FeatureSettings {
  darkTheme:         boolean
  logoReplacement:   boolean
  qcGroupHiding:     boolean
  noQcButton:        boolean
  recordNameFit:     boolean
  progressBar:       boolean
  copyCell:          boolean
  copyFieldName:     boolean
  devCopyCell:       boolean
  roundedCorners:    boolean
  secret:            boolean
}

/** Language the dev-copy button serializes an entity into. */
export type DevCopyFormat = 'python' | 'javascript' | 'json' | 'yaml' | 'php'

/** Non-boolean settings that configure a feature. */
export interface FeatureOptions {
  devCopyFormat: DevCopyFormat
}

/** Everything stored in browser.storage.sync. */
export type Settings = FeatureSettings & FeatureOptions

/** All features are enabled by default, except the dev-only ones. */
export const DEFAULT_SETTINGS: Settings = {
  darkTheme:         true,
  logoReplacement:   true,
  qcGroupHiding:     true,
  noQcButton:        true,
  recordNameFit:     true,
  progressBar:       true,
  copyCell:          true,
  copyFieldName:     true,
  devCopyCell:       false,
  roundedCorners:    true,
  secret:            true,
  devCopyFormat:     'python',
}

/** Formats offered by the dev-copy button, in popup order. */
export const DEV_COPY_FORMATS: Array<{ value: DevCopyFormat; label: string }> = [
  { value: 'python',     label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'json',       label: 'JSON' },
  { value: 'yaml',       label: 'YAML' },
  { value: 'php',        label: 'PHP' },
]

/** Feature categories, in the order they appear in the popup. */
export const FEATURE_CATEGORIES = ['Appearance', 'Review player', 'Grid', 'Fun'] as const
export type FeatureCategory = typeof FEATURE_CATEGORIES[number]

/** A dropdown rendered under its feature in the popup, bound to a FeatureOptions key. */
export interface FeatureOption {
  key:     keyof FeatureOptions
  label:   string
  choices: Array<{ value: string; label: string }>
}

/** Human-readable metadata for each feature, used by the popup UI. */
export const FEATURE_DEFS: Array<{
  key:         keyof FeatureSettings
  label:       string
  description: string
  category:    FeatureCategory
  option?:     FeatureOption
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
    key:         'devCopyCell',
    label:       'Dev Copy Button',
    description: 'Adds a </> icon above the copy icon that copies the cell\'s entity as a code snippet, e.g. {"type": "Version", "id": 4772452}',
    category:    'Grid',
    option:      {
      key:     'devCopyFormat',
      label:   'Snippet language',
      choices: DEV_COPY_FORMATS,
    },
  },
  {
    key:         'secret',
    label:       'Secret',
    description: 'Click a user\'s avatar 10 times for a little surprise',
    category:    'Fun',
  },
]
