import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import MarkDown from 'vite-plugin-md'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    VueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts'
    }),
    MarkDown({
      headEnabled: true
    }),
    VitePWA()
  ],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
