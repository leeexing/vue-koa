/**
 * 权限验证
 */
import { Cookies } from 'js-cookie'

const TokenKey = 'leeing_Token'

function getToken () {
  return Cookies.get(TokenKey)
}

function setToken (token) {
  return Cookies.set(TokenKey, token, {expires: 1, path: '/'})
}

function removeToekn () {
  return Cookies.remove(TokenKey)
}

export default {
  getToken,
  setToken,
  removeToekn
}
