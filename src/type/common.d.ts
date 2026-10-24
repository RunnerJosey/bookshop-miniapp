/**
 * 后端通用类型定义
 *
 * ⚠️ Long 精度约定：后端所有雪花 ID（Java Long）都被 JacksonConfig 序列化为字符串，
 * 前端所有 id 字段一律声明为 string 并原样回传（body / query 均可），
 * 全程禁止 Number() / parseInt / 一元 + 转换，否则会丢失精度。
 */

/** 统一响应包装（注意字段名是 message，不是 msg） */
interface ApiResult<T> {
  code: number
  message: string
  data: T
}

/** MyBatis-Plus 分页结构 */
interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}
