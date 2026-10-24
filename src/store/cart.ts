/**
 * 购物车全局状态：维护 TabBar 角标数量
 * count = 选中项(selected===1)的 quantity 之和
 * 与 H5 端逻辑一致，额外同步原生 tabBar 角标（购物车为第 3 个 tab，index=2）
 */
import { reactive } from 'vue'
import { fetchAllCartItems } from '@/api/cart'
import { useAuth } from '@/store/auth'

const state = reactive({
  count: 0,
})

/** 同步原生 tabBar 角标；tabBar 未就绪（如 H5 首帧）时静默 */
function syncTabBarBadge() {
  try {
    if (state.count > 0) {
      uni.setTabBarBadge({
        index: 2,
        text: state.count > 99 ? '99+' : String(state.count),
        fail: () => {
          /* 静默 */
        },
      })
    } else {
      uni.removeTabBarBadge({ index: 2, fail: () => {} })
    }
  } catch {
    /* 静默 */
  }
}

let refreshing: Promise<void> | null = null

export function useCartStore() {
  /** 刷新角标（登录态变化/加购/购物车操作后调用）；未登录直接归零；失败静默 */
  function refreshCartCount(): Promise<void> {
    const { isLoggedIn } = useAuth()
    if (!isLoggedIn()) {
      state.count = 0
      syncTabBarBadge()
      return Promise.resolve()
    }
    if (!refreshing) {
      refreshing = fetchAllCartItems()
        .then((items) => {
          state.count = items.reduce(
            (sum, item) => sum + (item.selected === 1 ? item.quantity || 0 : 0),
            0
          )
          syncTabBarBadge()
        })
        .catch(() => {
          /* 静默：错误提示已由 http 拦截器统一处理 */
        })
        .finally(() => {
          refreshing = null
        })
    }
    return refreshing
  }

  function clearCount() {
    state.count = 0
    syncTabBarBadge()
  }

  return { state, refreshCartCount, clearCount }
}