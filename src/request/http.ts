/**
 * uni.request 统一封装（对应 H5 端的 axios 封装，约定保持一致）
 *
 * 约定：
 * 1. 成功时剥壳直接返回 ApiResult.data，业务代码拿到的就是数据本体；
 * 2. 后端统一响应为 { code, message, data }，code === 200 为成功（字段是 message 不是 msg）；
 * 3. token 为登录接口返回的完整 "Bearer xxx" 串，原样存 storage、原样注入 Authorization 头，禁止二次拼接前缀；
 * 4. token 失效时后端返回 HTTP 500 + message "暂未登录或token已经过期"（不是 401），按文案匹配处理：
 *    清 token → 跳登录页（带 redirect 回跳）；
 * 5. 所有业务错误统一 uni.showToast，页面 catch 后只需收尾（停 loading 等）。
 *
 * baseURL 说明见 @/config：H5 端 '/api' 走 vite 代理，小程序端直连后端。
 */
import { BASE_URL } from '@/config'
import { storage, TOKEN_KEY } from '@/utils/storage'

const TIMEOUT = 10000
const LOGIN_PAGE = '/pages/login/login'
const REGISTER_PAGE = '/pages/register/register'

function isAuthExpiredMessage(msg: string): boolean {
  return msg.includes('暂未登录') || msg.includes('token已经过期') || msg.includes('token 已经过期')
}

/** 当前页面完整路径（含 query），用于登录回跳 */
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

function redirectToLogin(tip: string) {
  storage.remove(TOKEN_KEY)
  uni.showToast({ title: tip, icon: 'none' })
  const full = currentFullRoute()
  const path = full.split('?')[0]
  if (path !== LOGIN_PAGE && path !== REGISTER_PAGE) {
    const redirect = encodeURIComponent(full)
    uni.reLaunch({ url: `${LOGIN_PAGE}?redirect=${redirect}` })
  }
}

/** params → query string（对齐 axios：跳过 undefined/null，保留空串） */
function buildQuery(params?: Record<string, unknown>): string {
  if (!params) return ''
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
}

interface RequestOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: unknown
  params?: Record<string, unknown>
}

/** 泛型请求：resolve 剥壳后的 data，reject Error（错误提示已统一 toast） */
function request<T>(options: RequestOptions): Promise<T> {
  const { url, method, data, params } = options
  let fullUrl = BASE_URL + url
  const qs = buildQuery(params)
  if (qs) fullUrl += (fullUrl.includes('?') ? '&' : '?') + qs

  const header: Record<string, string> = { 'Content-Type': 'application/json;charset=utf-8' }
  const token = storage.get<string>(TOKEN_KEY)
  if (token) header.Authorization = token // 已是完整 "Bearer xxx"，原样放置

  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: fullUrl,
      method,
      data: data as string | AnyObject | ArrayBuffer | undefined,
      header,
      timeout: TIMEOUT,
      success: (res) => {
        const body = res.data as ApiResult<unknown> | undefined
        const bodyMsg =
          body && typeof body === 'object' && typeof body.message === 'string' ? body.message : ''

        // HTTP 非 2xx：token 过期走 HTTP 500 + 文案（后端非 401）
        if (res.statusCode < 200 || res.statusCode >= 300) {
          if (isAuthExpiredMessage(bodyMsg)) {
            redirectToLogin('登录已过期，请重新登录')
          } else {
            uni.showToast({ title: bodyMsg || `网络异常(${res.statusCode})，请稍后重试`, icon: 'none' })
          }
          reject(new Error(bodyMsg || `HTTP ${res.statusCode}`))
          return
        }

        // 统一响应剥壳
        if (body && typeof body === 'object' && 'code' in body) {
          if (body.code !== 200) {
            // 业务失败（GlobalExceptionHandler 转成 HTTP 200 + 业务 code）
            const msg = body.message || '请求失败'
            if (isAuthExpiredMessage(msg)) {
              redirectToLogin('登录已过期，请重新登录')
            } else {
              uni.showToast({ title: msg, icon: 'none' })
            }
            reject(new Error(msg))
            return
          }
          resolve(body.data as T)
          return
        }
        resolve(res.data as T)
      },
      fail: (err) => {
        const msg = err.errMsg || ''
        if (msg.includes('timeout')) {
          uni.showToast({ title: '请求超时，请稍后重试', icon: 'none' })
        } else {
          uni.showToast({ title: '网络异常，请稍后重试', icon: 'none' })
        }
        reject(new Error(msg || 'request fail'))
      },
    })
  })
}

/** 泛型请求方法：返回剥壳后的 data（签名与 H5 端 axios 封装一致，api/*.ts 零改动） */
export const http = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    request<T>({ url, method: 'GET', params }),
  post: <T>(url: string, data?: unknown, params?: Record<string, unknown>) =>
    request<T>({ url, method: 'POST', data, params }),
  put: <T>(url: string, data?: unknown, params?: Record<string, unknown>) =>
    request<T>({ url, method: 'PUT', data, params }),
  del: <T>(url: string, params?: Record<string, unknown>) =>
    request<T>({ url, method: 'DELETE', params }),
}