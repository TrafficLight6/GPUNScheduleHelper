// 登录 / 验证码 / 会话 相关接口与状态管理
import { get, post, getCookies } from './request'
import { encryptPassword } from './rsa'

// 走 Vite 开发代理：/lyuapServer 会被转发到 https://cas.gpnu.edu.cn
// 生产 / 手机原生环境请替换为对应的请求通道（原生桥或反向代理）。
const KAPTCHA_URL = '/lyuapServer/kaptcha'
const LOGIN_URL = '/lyuapServer/v1/tickets'

// 登录目标 service（信息门户）
const DEFAULT_SERVICE = 'https://webauth.gpnu.edu.cn/wengine-auth/login?cas_login=true'

const SESSION_KEY = 'gpnu-auth-session'

/**
 * 获取验证码。
 * @param {string} [uid] 刷新时传入上一次的 uid 以作废旧验证码
 * @returns {Promise<{kaptchaType:string, uid:string, content:string, timeout:number}>}
 */
export async function fetchCaptcha(uid = '') {
  return get(`${KAPTCHA_URL}?uid=${encodeURIComponent(uid)}`)
}

/**
 * 提交登录。
 * @param {{username:string, password:string, captcha:string, uid:string, service?:string}} params
 * @returns {Promise<object>} CAS 原始响应
 */
export async function login({ username, password, captcha, uid, service = DEFAULT_SERVICE }) {
  const body = {
    username: (username || '').replace(/\s+/g, ''),
    password: encryptPassword((password || '').replace(/\s+/g, '')),
    service,
    loginType: '',
    id: uid || '',
    code: (captcha || '').replace(/(^\s*)|(\s*$)/g, ''),
  }
  return post(LOGIN_URL, body, { form: true })
}

/**
 * 保存登录会话（票据 + 截取到的 Cookie）。
 */
export function saveSession({ tgt, ticket }) {
  const session = {
    tgt,
    ticket,
    cookies: getCookies(),
    time: Date.now(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
