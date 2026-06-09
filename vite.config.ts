import { defineConfig } from 'vite'

const fetchVersion = () => ({
  name: 'html-transform',
  transformIndexHtml(html: string) {
    return html.replace(/__APP_VERSION__/, `v${process.env.npm_package_version}`)
  }
})

export default defineConfig({
  // Root = src/ so popup/index.html outputs to public/popup/index.html (not public/src/popup/index.html)
  root:      'src',
  publicDir: '../static',
  plugins: [fetchVersion()],
  build: {
    outDir:      '../public',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: new URL('./src/popup/index.html', import.meta.url).pathname
      },
      output: {
        entryFileNames: '[name]/[name].js'
      }
    }
  }
})
