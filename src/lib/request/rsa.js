// 密码 RSA 加密：精确复刻学校 CAS 前端 rsa.js 的算法（零填充 + 16 位小端 + BigInt）
// 用于登录时把明文密码加密后提交给 /lyuapServer/v1/tickets。

// 与学校前端硬编码一致的 RSA 公钥
const PUBLIC_EXPONENT = '010001' // 即 65537
const MODULUS =
  '00b5eeb166e069920e80bebd1fea4829d3d1f3216f2aabe79b6c47a3c18dcee5fd22c2e7ac519cab59198ece036dcf289ea8201e2a0b9ded307f8fb704136eaeb670286f5ad44e691005ba9ea5af04ada5367cd724b5a26fdb5120cc95b6431604bd219c6b7d83a6f8f24b43918ea988a76f93c333aa5a20991493d4eb1117e7b1'

// 模数 1024 位，对应 128 字节一个分块
const CHUNK_SIZE = 128

// 模幂运算 base^exp % mod
function modPow(base, exp, mod) {
  let result = 1n
  base %= mod
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod
    exp >>= 1n
    base = (base * base) % mod
  }
  return result
}

// 复刻 rsa.js 的 biToHex：每 16 位输出 4 个小写 hex，高位为 0 的整段数字被省略
function bigIntToHex(value) {
  if (value === 0n) return '0'
  const digits = []
  let v = value
  while (v > 0n) {
    digits.push(Number(v & 0xffffn))
    v >>= 16n
  }
  let result = ''
  for (let i = digits.length - 1; i >= 0; i--) {
    result += digits[i].toString(16).padStart(4, '0')
  }
  return result
}

/**
 * RSA 加密明文（密码），返回与学校 rsa.js 一致的 hex 字符串。
 * @param {string} text 明文
 * @returns {string} 加密后的 hex（多个分块用空格连接）
 */
export function encryptPassword(text) {
  const e = BigInt('0x' + PUBLIC_EXPONENT)
  const n = BigInt('0x' + MODULUS)

  // 明文转 charCode 数组，末尾补 0 到分块对齐（与 rsa.js 一致）
  const codes = []
  for (let i = 0; i < text.length; i++) codes.push(text.charCodeAt(i))
  while (codes.length % CHUNK_SIZE !== 0) codes.push(0)

  const chunks = []
  for (let i = 0; i < codes.length; i += CHUNK_SIZE) {
    // 每两个 charCode 组成一个 16 位“digit”，digit0 是最低位（与 rsa.js 一致）
    let m = 0n
    for (let j = 0; j < CHUNK_SIZE; j += 2) {
      const digit = codes[i + j] + (codes[i + j + 1] << 8)
      m += BigInt(digit) * (1n << BigInt(16 * (j / 2)))
    }
    chunks.push(bigIntToHex(modPow(m, e, n)))
  }
  return chunks.join(' ')
}

export default encryptPassword
