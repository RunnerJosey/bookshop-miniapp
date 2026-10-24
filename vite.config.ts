import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://uniapp.dcloud.net.cn/
export default defineConfig({
  plugins: [uni()],
  server: {
    // 仅 H5 端开发时使用；端口 5174 避免与 bookshop-h5（5173）冲突
    host: true,
    port: 5174,
    proxy: {
      // H5 端走代理规避后端 CORS（后端只放行 http://localhost:8081）：
      // 浏览器同源请求 POST/PUT/DELETE 仍会带 Origin: http://localhost:5174，
      // 需把转发给后端的 Origin 改写为已放行的 8081。
      // 小程序端 wx.request 无 CORS 概念，直连 8083（见 src/config.ts）。
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        headers: { Origin: 'http://localhost:8081' },
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
