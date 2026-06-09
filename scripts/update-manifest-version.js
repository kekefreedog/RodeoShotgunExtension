import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

for (const file of ['static/manifest.json', 'static/manifestv2.json']) {
  const path = resolve(root, file)
  const manifest = JSON.parse(readFileSync(path, 'utf8'))
  if (manifest.version === version) continue
  manifest.version = version
  writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`Updated ${file} → ${version}`)
}
