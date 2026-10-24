/**
 * uni storage 统一封装（JSON 序列化 + 异常兜底）
 * 与 H5 端 localStorage 封装保持相同导出面，auth/bookshelf store 零改动复用
 * 注意：uni.getStorageSync 读不存在的 key 返回 ''（而非 null），需映射到 fallback
 */

/** 登录 token（后端登录接口返回的完整 "Bearer xxx" 串，原样存储、原样放请求头） */
export const TOKEN_KEY = 'bs_token'
/** 书架（收藏）本地存储 key */
export const SHELF_KEY = 'bs_bookshelf'
/** 搜索历史 key */
export const SEARCH_HISTORY_KEY = 'bs_search_history'
/** 记住的用户名 key */
export const LAST_USERNAME_KEY = 'bs_last_username'

export const storage = {
  get<T>(key: string, fallback: T | null = null): T | null {
    try {
      const raw = uni.getStorageSync(key)
      if (raw === '' || raw === null || raw === undefined) return fallback
      return (typeof raw === 'string' ? JSON.parse(raw) : raw) as T
    } catch {
      return fallback
    }
  },
  set(key: string, value: unknown): void {
    try {
      uni.setStorageSync(key, JSON.stringify(value))
    } catch {
      // 存储满等异常静默处理
    }
  },
  remove(key: string): void {
    try {
      uni.removeStorageSync(key)
    } catch {
      // 异常静默处理
    }
  },
}