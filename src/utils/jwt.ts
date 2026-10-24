/**
 * JWT 前端解析（不校验签名，仅解码 payload 用于展示与本地过期预检）
 * 后端 JwtUtil 生成的 payload 只有 { sub: userName, role, iat, exp }，没有 userId
 *
 * 小程序端无 atob / TextDecoder，改用 uni.base64ToArrayBuffer + 手写 UTF-8 解码
 */

/** UTF-8 字节数组 → 字符串（含多字节与代理对处理） */
function utf8BytesToString(bytes: Uint8Array): string {
  let str = ''
  let i = 0
  while (i < bytes.length) {
    const b = bytes[i]
    if (b < 0x80) {
      str += String.fromCharCode(b)
      i += 1
    } else if (b < 0xe0) {
      str += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i + 1] & 0x3f))
      i += 2
    } else if (b < 0xf0) {
      str += String.fromCharCode(
        ((b & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)
      )
      i += 3
    } else {
      const cp =
        ((b & 0x07) << 18) |
        ((bytes[i + 1] & 0x3f) << 12) |
        ((bytes[i + 2] & 0x3f) << 6) |
        (bytes[i + 3] & 0x3f)
      const off = cp - 0x10000
      str += String.fromCharCode(0xd800 + (off >> 10), 0xdc00 + (off & 0x3ff))
      i += 4
    }
  }
  return str
}

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token
    const parts = raw.split('.')
    if (parts.length < 2) return null
    // base64url → base64
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const buf = uni.base64ToArrayBuffer(padded)
    const json = utf8BytesToString(new Uint8Array(buf))
    const payload = JSON.parse(json) as JwtPayload
    if (!payload.sub) return null
    return payload
  } catch {
    return null
  }
}