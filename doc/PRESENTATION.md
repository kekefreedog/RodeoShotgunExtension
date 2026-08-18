# ShotGridRodeoFx — Presentation

> 🎥 = video placeholder. Drop a short screen recording (GIF or MP4, 5–15s) here for each feature before presenting.
> Replace `PLACEHOLDER.mp4` / `PLACEHOLDER.gif` with your actual file paths, or paste a link (Drive, Frame.io, etc.).

---

## 🇫🇷 Français

### C'est quoi ?

**ShotGridRodeoFx** est une extension de navigateur (Chrome & Firefox) qui améliore l'interface de Shotgun. Elle s'active automatiquement sur `rodeofx.shotgrid.autodesk.com` ( aucune installation serveur, aucun accès à tes données, bref tout se passe localement, dans le navigateur). 
Chaque amélioration est une feature indépendante, que l'on active ou désactive à la volée depuis le popup de l'extension.

Liste des **features**, organisées en 4 catégories : Apparence, Review Player, Grille, Fun.

---

### 🎨 Apparence

#### 1. Darkest Mode
Un thème sombre encore plus poussé que le dark theme natif de ShotGrid — noirs plus profonds et accent bleu.

🎥 `PLACEHOLDER.mp4`

#### 2. Remplacement du logo
Remplace le logo ShotGrid par le logo Rodeo FX dans l'interface.

🎥 `PLACEHOLDER.mp4`

#### 3. Barre de progression au chargement
Remplace le spinner de chargement plein écran par une barre de progression fine en bas de la fenêtre — moins intrusif.

🎥 `PLACEHOLDER.mp4`

#### 4. Coins arrondis
Adoucit les angles vifs de ShotGrid (cartes, boutons, onglets, menus, dialogs, toasts) pour un look plus moderne.

🎥 `PLACEHOLDER.mp4`

---

### 🎬 Review Player

#### 5. Masquage des groupes QC
Cache automatiquement les groupes de pipeline steps QC (QC IO, QC BMM (S), QC FX (S)…) dans la barre latérale du review player. Un observer surveille le DOM pour ré-appliquer le masquage à chaque changement de shot.

🎥 `PLACEHOLDER.mp4`

#### 6. Bouton "No QC Versions"
Ajoute un bouton dans le review player qui copie en un clic une chaîne de filtre prête à l'emploi, excluant toutes les versions QC — pratique pour les revues rapides.

🎥 `PLACEHOLDER.mp4`

#### 7. Ajustement automatique du nom de fichier
Les noms de fichiers longs dans l'en-tête du player (ex: `annot_version_4761587.39.png`) sont automatiquement réduits en taille de police pour tenir sur une seule ligne, sans coupure.

🎥 `PLACEHOLDER.mp4`

---

### 📊 Grille

#### 8. Bouton copier une cellule
Au survol d'une cellule dans la grille, une icône apparaît pour copier son contenu en un clic.

🎥 `PLACEHOLDER.mp4`

#### 9. Bouton copier le nom de champ
Au survol d'un en-tête de colonne, une icône permet de copier le nom technique (API name) du champ — très utile pour les devs/TDs qui scriptent.

🎥 `PLACEHOLDER.mp4`

#### 10. Bouton copie "dev" *(désactivé par défaut)*
Un second bouton copie l'entité complète de la cellule sous forme de snippet de code, au choix : Python, JavaScript, JSON, YAML ou PHP. Ex : `{"type": "Version", "id": 4772452}`.

🎥 `PLACEHOLDER.mp4`

---

### 🎉 Fun

#### 11. Secret
Cliquez 10 fois sur l'avatar d'un utilisateur pour une petite surprise. 👀

🎥 `PLACEHOLDER.mp4`

---
---

## 🇨🇦 English

### What is it?

**ShotGridRodeoFx** is a browser extension (Chrome & Firefox) that enhances the ShotGrid UI for Rodeo FX. It runs automatically on `shotgun.rodeofx.com` and `rodeofx.shotgrid.autodesk.com`, entirely client-side — no server changes — with each feature independently toggleable from a popup.

**11 features**, grouped into 4 categories: Appearance, Review Player, Grid, Fun.

---

### 🎨 Appearance

#### 1. Darkest Mode
An even deeper dark theme on top of ShotGrid's native dark mode — deeper blacks and a blue accent.

🎥 `PLACEHOLDER.mp4`

#### 2. Logo Replacement
Swaps the ShotGrid logo for the Rodeo FX logo across the UI.

🎥 `PLACEHOLDER.mp4`

#### 3. Loading Progress Bar
Replaces the full-screen loading spinner with a slim progress bar at the bottom of the frame — much less intrusive.

🎥 `PLACEHOLDER.mp4`

#### 4. Rounded Corners
Softens ShotGrid's sharp corners across cards, buttons, tabs, menus, dialogs and toast messages for a more modern look.

🎥 `PLACEHOLDER.mp4`

---

### 🎬 Review Player

#### 5. QC Group Hiding
Automatically hides QC pipeline-step groups (QC IO, QC BMM (S), QC FX (S)…) in the review player sidebar. A DOM observer re-applies the hiding whenever the version list rebuilds.

🎥 `PLACEHOLDER.mp4`

#### 6. "No QC Versions" Button
Adds a button in the review player that copies a ready-made filter string to the clipboard, excluding all QC versions — handy for quick reviews.

🎥 `PLACEHOLDER.mp4`

#### 7. Record Name Auto-Fit
Long file names in the player header (e.g. `annot_version_4761587.39.png`) are automatically scaled down in font size to fit on a single line, no clipping.

🎥 `PLACEHOLDER.mp4`

---

### 📊 Grid

#### 8. Copy Cell Button
Hovering a grid cell reveals a copy icon to grab its text content in one click.

🎥 `PLACEHOLDER.mp4`

#### 9. Copy Field Name Button
Hovering a column header reveals a copy icon for the field's technical/API name — great for devs/TDs writing scripts.

🎥 `PLACEHOLDER.mp4`

#### 10. Dev Copy Button *(off by default)*
A second button copies the cell's entity as a code snippet, in your choice of language: Python, JavaScript, JSON, YAML or PHP. E.g. `{"type": "Version", "id": 4772452}`.

🎥 `PLACEHOLDER.mp4`

---

### 🎉 Fun

#### 11. Secret
Click a user's avatar 10 times for a little surprise. 👀

🎥 `PLACEHOLDER.mp4`

---

## Notes for the presenter

- All features toggle live from the extension popup — no page reload needed.
- Available on both Chrome and Firefox.
- Suggested order for a live demo: Appearance → Review Player → Grid → Fun (save "Secret" for last 😉).
