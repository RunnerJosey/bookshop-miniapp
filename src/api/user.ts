/**
 * 用户相关接口
 * ⚠️ /user/** 全部匿名可访问（后端 permitAll）
 */
import { http } from '@/request/http'

/** 登录：data 直接是完整的 "Bearer <jwt>" 串，整串存储、整串放 Authorization 头 */
export const login = (form: LoginForm) => http.post<string>('/user/login', form)

/** 注册：七字段全必填（后端 @NotBlank），成功返回提示文案，不返回 token，需再登录 */
export const register = (form: RegisterForm) => http.post<string>('/user/register', form)

/**
 * 按用户名查找用户详情（"我的"页兜底方案）
 * ⚠️ JWT payload 中没有 userId，后端也没有 /user/me 接口，
 * 只能全量拉取用户列表后按 userName 匹配 —— 课设数据量小可接受，
 * 后端若补充 /user/me 应替换此实现。
 * 注意：返回的 User 含 password 字段，前端只取白名单字段，绝不展示/存储密码。
 */
export async function findUserByName(userName: string): Promise<UserInfo | undefined> {
  const page = await http.get<PageResult<UserInfo & { password?: string }>>('/user/getUserList', {
    current: 1,
    size: 500,
  })
  const found = page.records.find((u) => u.userName === userName)
  if (!found) return undefined
  // 白名单摘取，丢弃 password 等敏感字段
  const { id, userName: name, nickName, sex, phone, email, birthday, role, createTime } = found
  return { id, userName: name, nickName, sex, phone, email, birthday, role, createTime }
}
