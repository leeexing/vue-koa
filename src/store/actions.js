/**
 * created by leeing on 8/24
 */

export default {
  // 客户端保存state
  storageState ({commit}) {
    commit('STORAGE_STATE')
  },
  flashState ({commit}) {
    commit('FLASH_STATE')
  },
  // 保存用户名
  login ({commit}, userInfo) {
    commit('USER_LOGIN', userInfo)
  },
  updateUserInfo ({commit}, userInfo) {
    commit('UPDATE_USERINFO', userInfo)
  },
  // 关闭遮罩
  closeMask ({commit}) {
    commit('CLOSE_MASK')
  },
  // 显示遮罩
  showMask ({commit}) {
    commit('SHOW_MASK')
  },
  // 注册
  switchRegister ({commit}, value) {
    commit('SWITCH_REGISTER', value)
  },
  toggleSidenav ({commit}) {
    commit('COLLAPSE_SIDENAV')
  },
  setAdmin ({commit}, value) {
    commit('SET_ADMIN', value)
  },
  setOneEssayId ({commit}, value) {
    commit('ONE_ESSAY_ID', value)
  }
}
