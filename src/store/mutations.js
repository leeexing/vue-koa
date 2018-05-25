/**
 * created by leeing on 8/24
 */
import {SesStorage} from '@/util/storage'
import {Crypt} from '@/util/auth'

const STORAGE_STATE = 'STORAGE_STATE'
const FLASK_STATE = 'FLASK_STATE'
const USER_LOGIN = 'USER_LOGIN'
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
  // 恢复sessionStorage里面保存的store数据
  [FLASK_STATE] (state) {
    let sessionData = SesStorage.getItem('vuex-flask')
    let decrypted = Crypt.encrypt(sessionData)
    console.log(decrypted)
  },
  // 将state加密保存到sessionStorage中
  [STORAGE_STATE] (state) {
    let encrypted = Crypt.encrypt(state)
    SesStorage.setItem('vuex-flash', encrypted)
  },
  // 保存用户名
  [USER_LOGIN] (state, userInfo) {
    state.username = userInfo.username
    state.isAdmin = userInfo.isAdmin
    state.isLogined = true
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
