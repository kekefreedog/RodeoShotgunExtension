import path from 'node:path'

import { defineConfig } from 'vite'

const fetchVersion = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      return html.replace(
        /__APP_VERSION__/,
        `v${process.env.npm_package_version}`
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins:   [fetchVersion()],
  publicDir: false,
  build: {
    emptyOutDir: false,
    outDir: path.resolve(__dirname, 'public'),
    lib: {
      formats: ['iife'],
      entry: path.resolve(__dirname, 'src', 'background', 'index.ts'),
      name: 'ShotGridRodeoFx'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background/background.js',
        extend: true,
      }
    }
  }
})
