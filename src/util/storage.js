/**
 * localStorage简单封装
 * 协助解决浏览器刷新vuex数据丢失问题
 * @class Storage
 */
const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

class Storage {
  static getItem (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      return {}
    }
  }
  static setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  static removeItem (key) {
    localStorage.removeItem(key)
  }
  static keys () {
    Object.keys(localStorage)
  }
  static clear () {
    localStorage.clear()
  }
}

class SesStorage {
  static getItem (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (error) {
      return {}
    }
  }
  static setItem (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
  static removeItem (key) {
    sessionStorage.removeItem(key)
  }
  static keys () {
    Object.keys(sessionStorage)
  }
  static clear () {
    sessionStorage.clear()
  }
}

export {
  Storage,
  SesStorage
}
