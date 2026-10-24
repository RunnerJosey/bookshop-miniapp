/** 收货地址（对应后端 UserAddress 实体；consignee→consignee_name、phone→consignee_phone 由 @TableField 映射） */
interface AddressInfo {
  addressId: string // 雪花 Long → 字符串
  userId?: string
  consignee: string
  phone: string
  provinceName: string
  cityName: string
  districtName: string
  detailAddress: string
  addressLabel?: string // 家 / 公司 / 学校
  isDefault: number // Integer：1 默认 / 0 普通
  createTime?: string
  updateTime?: string
}

/** 地址新增/编辑表单（userId 后端从 token 取，前端不传） */
interface AddressForm {
  addressId?: string
  consignee: string
  phone: string
  provinceName: string
  cityName: string
  districtName: string
  detailAddress: string
  addressLabel?: string
  isDefault: number
}
