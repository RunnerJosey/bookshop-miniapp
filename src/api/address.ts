/**
 * 收货地址接口（UserAddressController，/address/*）
 * ⚠️ userId 后端从 token 解析，前端不传
 * ⚠️ add 返回 boolean 拿不到新 addressId —— 结算流程新增地址后回结算页重拉默认地址
 * ⚠️ update 须将 getById/selectPage 返回的完整记录展开后覆盖修改字段（保留 userId/addressId 字符串原样回传）
 */
import { http } from '@/request/http'

/** 地址列表（后端 is_default 优先排序），一次拉全 */
export const getAddressPage = (current = 1, size = 50) =>
  http.get<PageResult<AddressInfo>>('/address/selectPage', { current, size })

export const getAddressById = (id: string) =>
  http.get<AddressInfo>('/address/getById', { id })

export const addAddress = (data: AddressForm) =>
  http.post<boolean>('/address/add', data)

export const updateAddress = (data: AddressForm & Record<string, unknown>) =>
  http.put<boolean>('/address/update', data)

export const deleteAddresses = (idList: string[]) =>
  http.del<boolean>('/address/delete', { idList: idList.join(',') })

/** 拉全量地址 */
export async function fetchAllAddresses(): Promise<AddressInfo[]> {
  const page = await getAddressPage(1, 50)
  return page.records ?? []
}

/** 取默认地址：isDefault===1 优先，否则第一条；无地址返回 null */
export function pickDefaultAddress(list: AddressInfo[]): AddressInfo | null {
  if (!list || !list.length) return null
  return list.find((a) => a.isDefault === 1) ?? list[0]
}
