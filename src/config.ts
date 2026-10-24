/**
 * 全局配置
 *
 * 后端地址说明：
 * - H5 端：走 vite 代理 /api → http://localhost:8083（同源规避 CORS，见 vite.config.ts）
 * - 小程序端：wx.request 无 CORS 概念，直连后端；
 *   · 微信开发者工具模拟器：localhost 可用（需勾选"不校验合法域名"，manifest 已配 urlCheck:false）
 *   · 手机真机调试：localhost 不可达，把 MP_BASE_URL 改为电脑局域网 IP，如 http://192.168.1.100:8083
 *   · 正式发布：必须是 HTTPS + 微信后台配置的合法域名
 */

/** 小程序/APP 端后端地址（真机调试改为局域网 IP） */
const MP_BASE_URL = 'http://localhost:8083'

let baseUrl = MP_BASE_URL
// #ifdef H5
baseUrl = '/api'
// #endif

export const BASE_URL: string = baseUrl
