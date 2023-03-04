import { fileURLToPath, URL } from 'node:url'

import path from 'node:path'
import { rm } from 'node:fs'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'

// use rollup plugin to remove dist/mockServiceWorker.js
function stripDevPublic() {
  return {
    name: 'strip-dev-public',
    renderStart(outputOptions: { dir: string }) {
      const outDir = outputOptions.dir
      const mockJs = path.resolve(outDir, 'mockServiceWorker.js')
      rm(mockJs, { recursive: true }, () => {})
    }
  } as Plugin
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), stripDevPublic()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  },
  // https://vitejs.dev/config/build-options.html
  build: {
    target: 'es2015',
    cssTarget: 'chrome61'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import './src/styles/variables.scss';
          @import './src/styles/mixins.scss';
        `
      }
    },
    postcss: {
      plugins: [autoprefixer]
    }
  }
})
