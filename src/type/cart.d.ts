/**
 * 购物车项（对应后端 CartItem / CartItemResponse）
 * ⚠️ 服务端在 add 时硬编码 price = 1 元、specId = "1"、specName = "默认规格"，同书累加数量。
 */
interface CartItem {
  id: string
  userId?: string
  bookId: string // 雪花 ID → 字符串
  bookName: string
  specId?: string
  specName?: string
  quantity: number
  price: number // BigDecimal → number
  selected: number // Integer：1 选中 / 0 未选中
  addTime?: string
  updateTime?: string
}

/** 加购请求体（userId/specId/price 由服务端处理，前端不传） */
interface AddCartItemRequest {
  bookId: string
  bookName: string
  quantity: number
  selected: number
}
