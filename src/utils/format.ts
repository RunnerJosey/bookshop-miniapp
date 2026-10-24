/**
 * 展示格式化工具
 *
 * ⚠️ 价格口径说明：
 * - getMockPrice 生成的"参考价"仅用于 首页/图书列表/图书详情 的展示（后端 book 表无价格字段），
 *   绝不进入任何提交请求；
 * - 购物车/结算/订单 一律使用后端返回的真实 price/bookPrice/subtotal（当前服务端加购硬编码 1 元/本）。
 */

/** 简单字符串 hash（FNV 变体），同一输入恒定输出 */
export function hashCode(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/** 由 bookId 派生的确定性"参考价"：19.00 ~ 99.90，同一本书全局一致 */
export function getMockPrice(bookId: string): number {
  return 19 + (hashCode(bookId || 'book') % 8091) / 100
}

/** 金额格式化：¥xx.xx（仅展示用，不做计算） */
export function formatPrice(n: number | string | undefined | null): string {
  const num = typeof n === 'number' ? n : Number(n ?? 0)
  return '¥' + (Number.isFinite(num) ? num : 0).toFixed(2)
}

/** 日期时间格式化："yyyy-MM-dd HH:mm:ss" → "yyyy-MM-dd HH:mm"（后端已是 GMT+8 字符串，仅截断展示） */
export function formatDateTime(s?: string | null): string {
  if (!s) return '-'
  return s.replace('T', ' ').slice(0, 16)
}

/** 订单状态映射（OrderStatusEnum） */
export const ORDER_STATUS_MAP: Record<number, { text: string; desc: string }> = {
  0: { text: '待付款', desc: '订单已提交，等待买家付款' },
  1: { text: '待发货', desc: '买家已付款，等待卖家发货' },
  2: { text: '待收货', desc: '卖家已发货，等待买家确认收货' },
  3: { text: '已完成', desc: '交易完成，感谢惠顾' },
  4: { text: '已取消', desc: '订单已取消' },
  5: { text: '退款中', desc: '退款申请处理中' },
  6: { text: '已退款', desc: '退款已完成' },
}

/** 支付渠道映射（PayChannelEnum：1微信 2支付宝 3银联） */
export const PAY_TYPE_MAP: Record<number, string> = {
  1: '微信支付',
  2: '支付宝',
  3: '银联',
}

/** 可取消的订单状态（后端仅允许 0/1 取消） */
export const CANCELABLE_STATUS = [0, 1]
/** 可删除的订单状态（终态） */
export const DELETABLE_STATUS = [3, 4, 6]

export function orderStatusText(status: number): string {
  return ORDER_STATUS_MAP[status]?.text ?? '未知状态'
}
