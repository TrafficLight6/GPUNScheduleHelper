// 自动处理异步的 POST 请求封装

/**
 * 发送 POST 请求并自动处理异步响应。
 *
 * 默认以 JSON 编码请求体；传入 options.form = true 时改为
 * application/x-www-form-urlencoded 编码。响应内容优先按 JSON 解析，
 * 解析失败时原样返回文本。调用方直接 await 即可拿到数据，无需手动
 * 处理 .then() 或 response.json()。
 *
 * @param {string} url 请求地址
 * @param {object} [data] 请求体数据
 * @param {object} [options] 额外配置
 * @param {object} [options.headers] 自定义请求头
 * @param {boolean} [options.form] 是否以表单编码发送，默认 false
 * @param {number} [options.timeout] 超时时间（毫秒），默认 15000
 * @returns {Promise<any>} 解析后的响应数据
 */
export async function post(url, data = {}, options = {}) {
  const { headers = {}, form = false, timeout = 15000 } = options

  const config = {
    method: 'POST',
    headers: { ...headers },
  }

  if (form) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.body = new URLSearchParams(data).toString()
  } else {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    config.body = JSON.stringify(data)
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { ...config, signal: controller.signal })

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

export default post
