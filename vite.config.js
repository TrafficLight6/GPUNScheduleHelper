import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 开发期把学校 CAS 接口代理到本地，规避跨域与 Cookie 问题
      '/lyuapServer': {
        target: 'https://cas.gpnu.edu.cn',
        changeOrigin: true,
      },
    },
  },
})
