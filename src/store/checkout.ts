/**
 * 结算上下文：购物车页/详情页"立即购买"写入 → 结算页读取
 */
import { reactive } from 'vue'

const state = reactive({
  /** 参与结算的购物车项 id（Long 字符串） */
  cartItemIds: [] as string[],
  /** 选中的收货地址 id；空串表示结算页自行取默认地址 */
  addressId: '',
  /** 支付渠道：1微信 2支付宝 3银联（一期仅随单提交，无支付页） */
  payType: 1,
})

export function useCheckoutStore() {
  function setItems(ids: string[]) {
    state.cartItemIds = [...ids]
  }
  function reset() {
    state.cartItemIds = []
    state.addressId = ''
    state.payType = 1
  }
  return { state, setItems, reset }
}
