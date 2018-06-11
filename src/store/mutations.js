/**
 * created by leeing on 8/24
 */
import * as types from './types'
import {SesStorage} from '@/util/storage'
import {Crypt} from '@/util/auth'

export default {
  // 🎈恢复sessionStorage里面保存的store数据
  [types.FLASH_STATE] (state) {
    let sessionData = SesStorage.getItem('vuex-flash')
    let decrypted = Crypt.decrypt(sessionData)
    console.log('🈺解密之后的state >>> :', decrypted)
    let storeState = JSON.parse(decrypted)
    Object.assign(state, storeState)
  },
  // 🎈将state加密保存到sessionStorage中
  [types.STORAGE_STATE] (state) {
    let obj = {
      username: state.username,
      isAdmin: state.isAdmin,
      userID: state.userID
    }
    let encrypted = Crypt.encrypt(JSON.stringify(obj))
    // console.log('🈵加密后的state >>> :', encrypted)
    SesStorage.setItem('vuex-flash', encrypted)
  },
  // 🎈保存用户登录信息
  [types.USER_LOGIN] (state, userInfo) {
    state.userID = userInfo.id
    state.username = userInfo.username
    state.isAdmin = userInfo.isAdmin
    state.avatarUrl = userInfo.avatarUrl
    state.userMenus = userInfo.menu
    state.isLogined = true
  },
  // 更新用户头像地址
  [types.UPDATE_USERINFO] (state, userInfo) {
    state.avatarUrl = userInfo.avatar
  },
  // 设置用户菜单
  [types.SAVE_USER_MENU] (state, value) {
    state.userMenu = value
    SesStorage.setItem('menu', value)
  },
  // 关闭编辑状态下的遮罩层
  [types.CLOSE_EDIT_MASK] (state) {
    state.isShowMask = false
  },
  [types.SHOW_EDIT_MASK] (state) {
    state.isShowMask = true
  },
  // 切换到注册
  [types.SWITCH_REGISTER] (state, value) {
    state.isRegister = value
  },
  // 获取 list 数据
  [types.GET_TODOLIST] (state) {
    //
  },
  // 关闭侧边菜单栏
  [types.COLLAPSE_SIDENAV] (state) {
    state.collapseSideNav = !state.collapseSideNav
  },
  // ONE 文章 ID
  [types.ONE_ESSAY_ID] (state, essayId) {
    state.oneEssayId = essayId
  }
}
