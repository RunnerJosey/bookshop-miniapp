/**
 * 购物车接口
 * ⚠️ 禁止封装/调用 GET /cartItem/getById —— 后端 @PathVariable bug，调用必 500
 * ⚠️ add 返回 boolean，拿不到新购物车项 id（需要 id 时重拉列表按 bookId 匹配，同书累加保证唯一）
 * ⚠️ update 的 body 三字段（id/quantity/selected）必须每次带全当前值，防止缺失字段被置空
 * ⚠️ userId 后端从 token 解析，前端不传；price/specId/specName 服务端硬编码（1元/默认规格）
 */
import { http } from '@/request/http'

/** 购物车无真分页需求，一次拉全（当前用户） */
export const getCartPage = (current = 1, size = 100) =>
  http.get<PageResult<CartItem>>('/cartItem/selectPage', { current, size })

/** 加购：同书已存在则服务端累加数量 */
export const addCartItem = (data: AddCartItemRequest) =>
  http.post<boolean>('/cartItem/add', data)

/** 修改数量/选中态：三字段带全 */
export const updateCartItem = (data: { id: string; quantity: number; selected: number }) =>
  http.put<boolean>('/cartItem/update', data)

/** 批量删除：idList 逗号拼接为 query 参数 */
export const deleteCartItems = (idList: string[]) =>
  http.del<boolean>('/cartItem/delete', { idList: idList.join(',') })

/** 拉全量购物车项（简化调用） */
export async function fetchAllCartItems(): Promise<CartItem[]> {
  const page = await getCartPage(1, 100)
  return page.records ?? []
}
