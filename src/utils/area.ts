/**
 * 省市区数据转换工具
 * areaData.ts 从 Web 端（bookshop-vue）复制，结构为 { name, code, children }
 * Vant Cascader 需要 { text, value, children } 结构
 * ⚠️ 提交给后端的始终是名称文本（provinceName/cityName/districtName），code 仅前端级联定位用
 */
import { areaData, type AreaData } from './areaData'

export interface CascaderOption {
  text: string
  value: string
  children?: CascaderOption[]
}

/** { name, code, children } → { text, value, children } 递归转换 */
export function toCascaderOptions(list: AreaData[]): CascaderOption[] {
  return list.map((item) => {
    const option: CascaderOption = { text: item.name, value: item.code }
    const children = (item as { children?: AreaData[] }).children
    if (children && children.length) {
      option.children = toCascaderOptions(children as AreaData[])
    }
    return option
  })
}

/** 全量级联 options（模块级缓存，只转换一次） */
export const areaCascaderOptions: CascaderOption[] = toCascaderOptions(areaData)

/**
 * 编辑地址回填：按省/市/区名称反查 code 链（cascader 的 v-model 值）
 * 兼容"北京市"vs"北京"这类差异（先全等，后前缀/includes），找不到返回 null
 */
export function findAreaChainByName(
  province?: string,
  city?: string,
  district?: string
): string[] | null {
  if (!province) return null
  const match = (options: CascaderOption[], name?: string): CascaderOption | undefined => {
    if (!name) return undefined
    return (
      options.find((o) => o.text === name) ||
      options.find((o) => o.text.includes(name) || name.includes(o.text))
    )
  }
  const p = match(areaCascaderOptions, province)
  if (!p) return null
  const c = match(p.children ?? [], city)
  if (!c) return null
  const d = match(c.children ?? [], district)
  if (!d) return null
  return [p.value, c.value, d.value]
}
