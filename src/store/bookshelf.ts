/**
 * 我的书架（收藏）—— 后端无对应接口，纯 localStorage 实现
 * 存储结构：{ v: 1, items: [{ bookId, bookName, author, addTime }] }
 * 只存渲染卡片所需最小快照，点击进详情时重新拉取最新数据
 */
import { reactive } from 'vue'
import { storage, SHELF_KEY } from '@/utils/storage'

export interface ShelfItem {
  bookId: string
  bookName: string
  author: string
  addTime: number // Date.now()，排序用
}

interface ShelfStorage {
  v: 1
  items: ShelfItem[]
}

function load(): ShelfItem[] {
  const data = storage.get<ShelfStorage>(SHELF_KEY)
  if (data && data.v === 1 && Array.isArray(data.items)) return data.items
  return []
}

const state = reactive({
  items: load(),
})

function persist() {
  storage.set(SHELF_KEY, { v: 1, items: state.items } satisfies ShelfStorage)
}

export function useBookshelf() {
  function has(bookId: string): boolean {
    return state.items.some((i) => i.bookId === bookId)
  }

  /** 加入书架（已存在则忽略） */
  function add(book: { id: string; bookName: string; author?: string }) {
    if (has(book.id)) return
    state.items.unshift({
      bookId: book.id,
      bookName: book.bookName,
      author: book.author ?? '',
      addTime: Date.now(),
    })
    persist()
  }

  /** 移出书架 */
  function remove(bookId: string) {
    const idx = state.items.findIndex((i) => i.bookId === bookId)
    if (idx >= 0) {
      state.items.splice(idx, 1)
      persist()
    }
  }

  /** 切换收藏态，返回切换后是否已收藏 */
  function toggle(book: { id: string; bookName: string; author?: string }): boolean {
    if (has(book.id)) {
      remove(book.id)
      return false
    }
    add(book)
    return true
  }

  function clear() {
    state.items.splice(0, state.items.length)
    persist()
  }

  return { state, has, add, remove, toggle, clear }
}
