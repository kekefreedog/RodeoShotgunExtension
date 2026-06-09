# ShotGridRodeoFx

Browser extension that improves the ShotGrid UI for Rodeo FX. Works on **Firefox** (MV3, ≥ 109) and **Chrome** (MV3, ≥ 137).

Active on `https://shotgun.rodeofx.com/*` and `https://rodeofx.shotgrid.autodesk.com/*`.

---

## Features

All features are togglable live from the extension popup — no page reload needed.

| Feature | Default | Description |
|---|---|---|
| **Darkest Mode** | on | Deeper blacks and blue accent on top of ShotGrid's dark theme |
| **Logo Replacement** | on | Replaces the ShotGrid logo with the Rodeo FX logo (light/dark aware) |
| **Hide QC Groups** | on | Hides QC pipeline-step groups in the review player |
| **No QC Versions Button** | on | Injects a button that copies a ready-to-use filter string to clipboard |

CSS-only enhancements (always active): border-radius polish, nav scrollbar, z-index fixes, tab styling, form rounding.

---

## Setup

```sh
npm install
```

---

## Scripts

### `npm run watch:firefox`
Builds the extension, launches **Firefox** with the extension loaded at `rodeofx.shotgrid.autodesk.com`. Vite watches for file changes and rebuilds automatically; Firefox reloads the extension on each rebuild.

### `npm run watch:chrome`
Same but launches **Chrome** via web-ext CDP (works with Chrome ≥ 137). Chrome shows a one-time "unsupported flag" info bar on startup — cosmetic, can be dismissed.

> Both watch commands use persistent dev profiles (`.firefox-dev-profile/`, `.chrome-dev-profile/`) stored at the project root and gitignored.

### `npm run bundle:firefox`
Full production build → `releases/firefox/shotgridrodeofx-firefox-v{version}.xpi`

### `npm run bundle:chrome`
Full production build → `releases/chrome/shotgridrodeofx-chrome-v{version}.zip`

---

## Loading the unpacked extension manually

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. **Load Temporary Add-on…** → select `public/manifest.json`

### Chrome
1. Go to `chrome://extensions/` → enable **Developer mode**
2. **Load unpacked** → select the `public/` folder

> Run a bundle command first to populate `public/`.

---

## Project structure

```
src/
  shared/
    types.ts                  # FeatureSettings type, defaults, popup metadata
  content-script/
    index.tsx                 # Orchestrator — reads storage, wires features
    utils.ts                  # Shared helpers (getLogoUrl, waitForElements)
    index.scss                # ShotGrid UI fixes (always active)
    dark-theme.scss           # Enhanced dark theme CSS variables
    features/
      dark-theme.ts           # Darkest mode toggle
      logo.ts                 # Logo replacement toggle
      qc-groups.ts            # QC group hiding toggle
      no-qc-button.ts         # No QC Versions button toggle
  background/
    index.ts                  # MV3 service worker
  popup/
    index.html                # Popup entry point
    index.tsx                 # React mount
    component.tsx             # Popup UI — feature toggle list
    Switch.tsx                # Reusable toggle switch component
    style.scss                # Popup dark UI styles
static/
  manifest.json               # Unified MV3 manifest (Firefox + Chrome)
  manifestv2.json             # Mirror — kept for version bump script
  icon-*.png / logo-*.png     # Extension icons and RodeoFX logos
public/                       # Compiled output — gitignored, rebuilt by scripts
releases/
  firefox/ / chrome/          # Packaged releases — gitignored
assets/                       # Design source files (PSD originals) — not packaged
```

---

## Adding a new feature switch

Each feature is a self-contained module. Four steps:

### 1. Declare the setting — `src/shared/types.ts`

```ts
// Add to the interface:
export interface FeatureSettings {
  // ...existing...
  myFeature: boolean
}

// Add to defaults:
export const DEFAULT_SETTINGS: FeatureSettings = {
  // ...existing...
  myFeature: true,
}

// Add to popup metadata:
export const FEATURE_DEFS = [
  // ...existing...
  {
    key:         'myFeature' as const,
    label:       'My Feature',
    description: 'Short description shown in the popup',
  },
]
```

### 2. Create the feature module — `src/content-script/features/my-feature.ts`

Export `enable()` and `disable()`. Every DOM change made in `enable()` must be reversed in `disable()`.

```ts
export function enable(): void {
  document.body.classList.add('rdo-my-feature')
}

export function disable(): void {
  document.body.classList.remove('rdo-my-feature')
}
```

### 3. Register it — `src/content-script/index.tsx`

```ts
import * as MyFeature from './features/my-feature'

const FEATURES: Record<keyof FeatureSettings, ...> = {
  // ...existing...
  myFeature: MyFeature,
}
```

### 4. Add CSS (optional) — `src/content-script/index.scss`

For togglable styles, scope them to the body class your feature adds:

```scss
body.rdo-my-feature .some-shotgrid-selector {
  // your overrides
}
```

For styles that are always active (not tied to the toggle), add them directly to `index.scss` without the body class guard.

---

The popup toggle, storage persistence, and live reload are handled automatically by the orchestrator in `index.tsx`.
