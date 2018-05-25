/**
 * localStorage简单封装
 * 
 * 协助解决浏览器刷新vuex数据丢失问题
 * 
 * @class Storage
 */
const LS = window.localStorage
const SS = window.sessionStorage

class Storage {
  static getItem (key) {
    try {
      return JSON.parse(LS.getItem(key))
    } catch (error) {
      return null
    }
  }
  static setItem (key, value) {
    LS.setItem(key, JSON.stringify(value))
  }
  static removeItem (key) {
    LS.removeItem(key)
  }
  static keys () {
    Object.keys(LS)
  }
  static clear () {
    LS.clear()
  }
}

class SessionStorage {
  static getItem (key) {
    try {
      return JSON.parse(SS.getItem(key))
    } catch (error) {
      return null
    }
  }
  static setItem (key, value) {
    SS.setItem(key, JSON.stringify(value))
  }
  static removeItem (key) {
    SS.removeItem(key)
  }
  static keys () {
    Object.keys(SS)
  }
  static clear () {
    SS.clear()
  }
}

export default {
  Storage,
  SessionStorage
}