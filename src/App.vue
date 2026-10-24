<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useAuth } from '@/store/auth'
import { useCartStore } from '@/store/cart'

onLaunch(() => {
  // 启动时若已有有效 token，恢复购物车角标（未登录则路由守卫在各页面处理）
  const { isLoggedIn } = useAuth()
  if (isLoggedIn()) {
    useCartStore().refreshCartCount()
  }
})
</script>

<style>
@import './styles/global.css';
</style>
