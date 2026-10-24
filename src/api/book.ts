/**
 * 图书接口
 * ⚠️ GET /book 需要登录（后端除 /user/** 外全部需 token）
 * ⚠️ 后端不支持搜索/分类参数，也无价格/封面字段 —— 搜索用 fetchAllBooks + 本地过滤
 */
import { http } from '@/request/http'

export const getBookPage = (current: number, size: number) =>
  http.get<PageResult<Book>>('/book', { current, size })

export const getBookById = (id: string) => http.get<Book>('/book/getById', { id })

/**
 * 一次拉全量图书（供列表页本地搜索/排序）
 * size=500，pages>1 时续拉，最多 20 页保险上限
 */
export async function fetchAllBooks(): Promise<Book[]> {
  const first = await getBookPage(1, 500)
  const all = [...first.records]
  const maxPage = Math.min(first.pages ?? 1, 20)
  for (let p = 2; p <= maxPage; p++) {
    const next = await getBookPage(p, 500)
    all.push(...next.records)
  }
  return all
}
