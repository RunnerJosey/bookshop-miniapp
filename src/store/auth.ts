/**
 * 认证状态（轻量 reactive store，未引入 pinia）
 * token = 登录接口返回的完整 "Bearer xxx" 串
 */
import { reactive } from 'vue'
import { storage, TOKEN_KEY } from '@/utils/storage'
import { parseJwtPayload } from '@/utils/jwt'
import { findUserByName } from '@/api/user'

const state = reactive({
  token: storage.get<string>(TOKEN_KEY) ?? '',
  userName: '',
  role: '',
  exp: 0, // JWT 过期时间（秒级时间戳），0 表示未知
  profile: null as UserInfo | null,
})

/** 从 token 解析 payload 填充 state（模块初始化与 setToken 后调用） */
function applyPayload() {
  const payload = state.token ? parseJwtPayload(state.token) : null
  state.userName = payload?.sub ?? ''
  state.role = payload?.role ?? ''
  state.exp = payload?.exp ?? 0
}
applyPayload()

let profileLoading: Promise<void> | null = null

export function useAuth() {
  /** 本地预检：token 非空且未过期（服务端过期兜底由 http 拦截器处理） */
  function isLoggedIn(): boolean {
    if (!state.token || !state.userName) return false
    if (state.exp && state.exp * 1000 <= Date.now()) return false
    return true
  }

  /** 登录成功后调用：整串存储 + 解析 payload */
  function setToken(raw: string) {
    storage.set(TOKEN_KEY, raw)
    state.token = raw
    state.profile = null
    applyPayload()
  }

  /**
   * 补充用户详情（手机号/邮箱等）—— 兜底方案：全量拉用户列表按 userName 匹配
   * 失败静默（页面降级只显示 JWT 信息），并发去重
   */
  function loadProfile(): Promise<void> {
    if (state.profile || !state.userName) return Promise.resolve()
    if (!profileLoading) {
      profileLoading = findUserByName(state.userName)
        .then((user) => {
          if (user) state.profile = user
        })
        .catch(() => {
          /* 静默降级 */
        })
        .finally(() => {
          profileLoading = null
        })
    }
    return profileLoading
  }

  /** 退出登录：清 token + 状态（跳转由调用方处理） */
  function logout() {
    storage.remove(TOKEN_KEY)
    state.token = ''
    state.userName = ''
    state.role = ''
    state.exp = 0
    state.profile = null
  }

  return { state, isLoggedIn, setToken, loadProfile, logout }
}
