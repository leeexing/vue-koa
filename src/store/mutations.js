/**
 * created by leeing on 8/24
 */
const USER_LOGIN = 'USER_LOGIN'
const CLOSE_MASK = 'CLOSE_MASK'
const GET_TODOLIST = 'GET_TODOLIST'
const SWITCH_REGISTER = 'SWITCH_REGISTER'
const COLLAPSE_SIDENAV = 'COLLAPSE_SIDENAV'
const SET_ADMIN = 'SET_ADMIN'
const SHOW_MASK = 'SHOW_MASK'
const ONE_ESSAY_ID = 'ONE_ESSAY_ID'
// const SHOW_SUGGEST = 'SHOW_SUGGEST'
// const SLOSE_SUGGEST = 'CLOSE_SUGGEST'
// const INIT_MAP = 'INIT_MAP'
// const CLOSE_LOCATION_ERROR = 'CLOSE_LOCATION_ERROR'
// const SET_POSITION = 'SET_POSITION'

export default {
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
