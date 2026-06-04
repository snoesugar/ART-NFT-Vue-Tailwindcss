import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite' // 💡 記得補上引入 loadEnv
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 💡 撈出目前環境（例如 development）中以 VITE_ 開頭的環境變數
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // 💡 優先吃環境變數的設定，如果沒有設定，就用你原本的 '/ART-NFT-Vue-Tailwindcss/' 當作預備方案
    base: process.env.NODE_ENV === 'production' ? '/ART-NFT-Vue-Tailwindcss/' : '/',

    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(), // 你的 Tailwind v4 外掛
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
