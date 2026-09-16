// 自动处理异步的 HTTP 请求封装

// 会话 Cookie 记录：登录后在此保存学校下发的 Cookie。
// 注意：浏览器 JS 无法读取跨域响应的 Set-Cookie（该响应头被浏览器禁止读取），
// 只能读到当前源的 document.cookie。因此：
//   - 同源（代理 / 原生注入）时：每次请求会自动把 document.cookie 存入 cookieJar；
//   - 原生 WebView 请求层：请用 setCookies() 把原生层捕获到的 Set-Cookie 写入 cookieJar。
let cookieJar = ''

function captureCookies() {
  if (typeof document !== 'undefined' && document.cookie) {
    cookieJar = document.cookie
  }
}

export function getCookies() {
  return cookieJar
}

export function setCookies(value) {
  cookieJar = value || ''
}

async function request(url, options = {}) {
  const { method = 'GET', headers = {}, body, form = false, timeout = 15000 } = options

  const config = {
    method,
    headers: { ...headers },
    credentials: 'include', // 带上 / 接收 Cookie
  }

  if (body !== undefined && body !== null) {
    if (form) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      config.body = new URLSearchParams(body).toString()
    } else {
      config.headers['Content-Type'] = 'application/json; charset=UTF-8'
      config.body = typeof body === 'string' ? body : JSON.stringify(body)
    }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { ...config, signal: controller.signal })
    captureCookies()

    if (!response.ok) {
      throw new Error(`请求失败：HTTP ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    if (!text) return null
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('请求超时')
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}

export function get(url, options = {}) {
  return request(url, { ...options, method: 'GET' })
}

export function post(url, data = {}, options = {}) {
  return request(url, { ...options, method: 'POST', body: data })
}

export default post
