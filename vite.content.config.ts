import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  publicDir: false,
  define: {
    'process.env': {}
  },
  build: {
    emptyOutDir: false,
    outDir: path.resolve(__dirname, 'public'),
    lib: {
      formats: ['iife'],
      entry: path.resolve(__dirname, 'src', 'content-script', 'index.tsx'),
      name: 'ShotGridRodeoFx'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'contentScript/index.js',
        extend: true,
      }
    }
  }
})
