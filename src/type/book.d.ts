/**
 * 图书类型
 * ⚠️ 后端 book 表只有基础字段：无价格、无封面、无分类、无库存，
 * 且列表接口不支持搜索参数 —— 展示用"参考价"与 CSS 占位封面均为前端 mock，搜索为本地过滤。
 */
interface Book {
  id: string // 雪花 Long → 字符串
  bookName: string
  author: string
  introduce?: string
  creater?: string
  createTime?: string
  updateTime?: string
}
