/**
 * created by leeing on 8/24
 */
import {SesStorage} from '@/util/storage'
import {Crypt} from '@/util/auth'

const STORAGE_STATE = 'STORAGE_STATE'
const FLASH_STATE = 'FLASH_STATE'
const USER_LOGIN = 'USER_LOGIN'
const UPDATE_USERINFO = 'UPDATE_USERINFO'

const CLOSE_MASK = 'CLOSE_MASK'
const GET_TODOLIST = 'GET_TODOLIST'
const SWITCH_REGISTER = 'SWITCH_REGISTER'
const COLLAPSE_SIDENAV = 'COLLAPSE_SIDENAV'
const SET_ADMIN = 'SET_ADMIN'
const SHOW_MASK = 'SHOW_MASK'
const ONE_ESSAY_ID = 'ONE_ESSAY_ID'

// let data = 'leeing --- JSEncrypt实例化（此部分可做成工具类，供项目中各模块使用）'
// let encode = Crypt.encrypt(data)
// console.log('加密数据 >>>> ', encode)
// console.log('揭秘数据 <<< ', Crypt.decrypt(encode))

export default {
  // 🎈恢复sessionStorage里面保存的store数据
  [FLASH_STATE] (state) {
    let sessionData = SesStorage.getItem('vuex-flash')
    let decrypted = Crypt.decrypt(sessionData)
    console.log('🈺解密之后的state >>> :', decrypted)
    let storeState = JSON.parse(decrypted)
    Object.assign(state, storeState)
  },
  // 🎈将state加密保存到sessionStorage中
  [STORAGE_STATE] (state) {
    let obj = {
      username: state.username,
      isAdmin: state.isAdmin,
      userID: state.userID
    }
    let encrypted = Crypt.encrypt(JSON.stringify(obj))
    // console.log('🈵加密后的state >>> :', encrypted)
    SesStorage.setItem('vuex-flash', encrypted)
  },
  // 🎈保存用户名
  [USER_LOGIN] (state, userInfo) {
    state.username = userInfo.username
    state.userID = userInfo.id
    state.isAdmin = userInfo.isAdmin
    state.avatarUrl = userInfo.avatarUrl
    state.isLogined = true
  },
  [UPDATE_USERINFO] (state, userInfo) {
    state.avatarUrl = userInfo.avatar
  },
  // 关闭遮罩层
  [CLOSE_MASK] (state) {
    state.isShowMask = false
  },
  [SHOW_MASK] (state) {
    state.isShowMask = true
  },
  // 切换到注册
  [SWITCH_REGISTER] (state, value) {
    state.isRegister = value
  },
  // 获取 list 数据
  [GET_TODOLIST] (state) {
    //
  },
  // 关闭侧边菜单栏
  [COLLAPSE_SIDENAV] (state) {
    state.collapseSideNav = !state.collapseSideNav
  },
  // 记录是否是管理员
  [SET_ADMIN] (state, value) {
    state.isAdmin = value
  },
  // ONE 文章 ID
  [ONE_ESSAY_ID] (state, essayId) {
    state.oneEssayId = essayId
  }
}
