/**
 * 订单接口
 * ⚠️ "全部"状态必须省略 orderStatus 参数（传 -1 会查 order_status=-1 → 空列表）
 * ⚠️ cancelOrder 是 query 参数（?orderId=&cancelReason=），不是 JSON body；仅状态 0/1 可取消
 * ⚠️ checkout 成功后服务端会删除已下单的购物车项
 * ⚠️ orderId/addressId/cartItemIds 全部是 Long 字符串，原样回传
 */
import { http } from '@/request/http'

/** 结算创建订单 */
export const checkout = (data: CheckoutRequest) =>
  http.post<BookOrder>('/bookOrder/checkout', data)

/** 订单分页：orderStatus 为 undefined 时不带该参数 = 全部 */
export const getOrderPage = (current: number, size: number, orderStatus?: number) =>
  http.get<PageResult<BookOrder>>(
    '/bookOrder/selectPage',
    orderStatus === undefined ? { current, size } : { current, size, orderStatus }
  )

/** 订单详情：返回 { order, itemList } */
export const getOrderById = (id: string) =>
  http.get<OrderDetail>('/bookOrder/getById', { id })

/** 取消订单（仅状态 0/1） */
export const cancelOrder = (orderId: string, cancelReason?: string) =>
  http.put<boolean>(
    '/bookOrder/cancel',
    undefined,
    cancelReason ? { orderId, cancelReason } : { orderId }
  )

/** 删除订单（批量，逗号拼接） */
export const deleteOrders = (idList: string[]) =>
  http.del<boolean>('/bookOrder/delete', { idList: idList.join(',') })
