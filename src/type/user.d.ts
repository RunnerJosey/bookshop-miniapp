/** 用户相关类型 */

/** 用户信息（id 为雪花 Long → 字符串） */
interface UserInfo {
  id: string
  userName: string
  nickName?: string
  sex?: string // "1"男 / "0"女（与 Web 端口径一致）
  phone?: string
  email?: string
  birthday?: string // "yyyy-MM-dd"
  role?: string
  createTime?: string
}

interface LoginForm {
  userName: string
  password: string
}

/**
 * 注册表单 —— 对应后端 UserRegisterRequest，
 * userName/password/sex/phone/email/birthday/nickName 全部 @NotBlank 必填
 */
interface RegisterForm {
  userName: string // ^[a-zA-Z0-9_]{5,20}$
  password: string // ≥6 位
  sex: string // ≤1 字符："1"男 / "0"女
  phone: string // 11 位
  email: string
  birthday: string // "yyyy-MM-dd"
  nickName: string
  memo?: string
}

/** JWT payload（后端 JwtUtil 只放 sub/role/iat/exp，没有 userId） */
interface JwtPayload {
  sub: string // userName
  role?: string
  iat: number
  exp: number // 秒级时间戳
}
