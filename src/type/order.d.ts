/**
 * 订单相关类型
 * 订单状态：0待付款 1待发货 2待收货 3已完成 4已取消 5退款中 6已退款
 * payType：1微信 2支付宝 3银联（PayChannelEnum）
 */

interface BookOrder {
  orderId: string // 雪花 Long → 字符串
  userId?: string
  orderStatus: number
  totalAmount: number // BigDecimal → number
  payAmount: number
  discountAmount: number
  freight: number
  payType: number
  payTime?: string
  addressId: string
  consignee: string
  phone: string
  address: string // 省市区+详细 拼接串
  cancelReason?: string
  createTime: string
}

interface BookOrderItem {
  itemId: string
  isbn: string // = 购物车 bookId
  bookName: string
  bookPrice: number
  quantity: number
  subtotal: number
  discount: number
}

/** GET /bookOrder/getById 返回结构 */
interface OrderDetail {
  order: BookOrder
  itemList: BookOrderItem[]
}

/** POST /bookOrder/checkout 请求体 */
interface CheckoutRequest {
  cartItemIds: string[] // Long 字符串数组，原样回传
  payType: number
  addressId: string
}
