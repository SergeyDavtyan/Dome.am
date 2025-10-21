import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        building: resolve(__dirname, 'srtoy.html'),
        parlament: resolve(__dirname, 'parlament.html')
      }
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.json']
})
