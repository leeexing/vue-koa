/**
 * 权限验证
 */
import Cookies from 'js-cookie'
import {TOKEN_KEY} from './config'

const TokenKey = Buffer.from(TOKEN_KEY, 'base64') // base64 解码

function getToken () {
  return Cookies.get(TokenKey)
}

function setToken (token) {
  return Cookies.set(TokenKey, token, {expires: 1, path: '/'})
}

function removeToekn () {
  return Cookies.remove(TokenKey)
}

/**
 * 加密解密
 * JSEncrypt
 * 用于sessionStorage信息的加密解密
 * 🆑已弃用
*/
import JsEncrypt from 'jsencrypt'
import {PublicKey, PrivateKey} from '@/util/config'

const jse = new JsEncrypt()
jse.setPublicKey(PublicKey)
jse.setPrivateKey(PrivateKey)

class Crypt {
  static encrypt (value) {
    return jse.encrypt(value)
  }
  static decrypt (value) {
    return jse.decrypt(value)
  }
}

export {
  getToken,
  setToken,
  removeToekn,
  Crypt
}
