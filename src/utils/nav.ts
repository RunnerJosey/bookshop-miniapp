/**
 * 导航 + 登录守卫助手（替代 H5 端 vue-router 全局守卫）
 *
 * 约定（与 h5 router/index.ts 一致）：
 * - 免登录页仅 login / register，其余 11 页全部要求登录；
 * - 受保护页 onShow 首行调用 `if (!requireAuth()) return`；
 * - tabBar 4 页必须走 switchTab（不能带 query），其余 navigateTo。
 */
import { useAuth } from '@/store/auth'

export const HOME_PAGE = '/pages/home/home'
export const LOGIN_PAGE = '/pages/login/login'
export const REGISTER_PAGE = '/pages/register/register'

const TAB_PAGES = [
  '/pages/home/home',
  '/pages/bookshelf/bookshelf',
  '/pages/cart/cart',
  '/pages/mine/mine',
]

/** url 是否 tabBar 页（忽略 query） */
export function isTabPage(url: string): boolean {
  return TAB_PAGES.includes(url.split('?')[0])
}

/** 当前页面完整路径（含 query） */
function currentFullRoute(): string {
  const pages = getCurrentPages()
  const cur = pages[pages.length - 1] as
    | { route?: string; options?: Record<string, string>; $page?: { options?: Record<string, string> } }
    | undefined
  if (!cur || !cur.route) return ''
  const path = `/${cur.route}`
  const opts = cur.options ?? cur.$page?.options ?? {}
  const qs = Object.entries(opts)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return qs ? `${path}?${qs}` : path
}

/**
 * 登录守卫：已登录返回 true；未登录 reLaunch 到登录页（带 redirect 回跳）并返回 false。
 * 受保护页 onShow 首行调用：`if (!requireAuth()) return`
 */
export function requireAuth(): boolean {
  const { isLoggedIn } = useAuth()
  if (isLoggedIn()) return true
  const full = currentFullRoute()
  const redirect = full ? `?redirect=${encodeURIComponent(full)}` : ''
  uni.reLaunch({ url: `${LOGIN_PAGE}${redirect}` })
  return false
}

/** 普通跳转：tabBar 页自动 switchTab（丢弃 query），其余 navigateTo */
export function navTo(url: string) {
  if (isTabPage(url)) {
    uni.switchTab({ url: url.split('?')[0] })
  } else {
    uni.navigateTo({ url })
  }
}

/** 返回上一页；页面栈只剩一页时兜底回首页（如分享/编译直达详情页） */
export function navBack(fallback = HOME_PAGE) {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else if (isTabPage(fallback)) {
    uni.switchTab({ url: fallback.split('?')[0] })
  } else {
    uni.redirectTo({ url: fallback })
  }
}

/**
 * 登录成功后回跳：
 * - redirect 为 tabBar 页 → switchTab（query 丢弃）
 * - 其他 → redirectTo 替换登录页
 * - 缺省回首页
 */
export function redirectAfterLogin(redirect?: string) {
  const target = redirect && redirect.startsWith('/') ? redirect : HOME_PAGE
  if (isTabPage(target)) {
    uni.switchTab({ url: target.split('?')[0] })
  } else {
    uni.redirectTo({
      url: target,
      fail: () => uni.reLaunch({ url: target }),
    })
  }
}