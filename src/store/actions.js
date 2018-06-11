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
  // 设置用户菜单
  saveUserMenu ({commit}, value) {
    commit('SAVE_USER_MENU', value)
  },
  // 关闭编辑时弹出的遮罩层
  closeEditMask ({commit}) {
    commit('CLOSE_EDIT_MASK')
  },
  // 显示编辑时弹出的遮罩层
  showEditMask ({commit}) {
    commit('SHOW_EDIT_MASK')
  },
  // 注册
  switchRegister ({commit}, value) {
    commit('SWITCH_REGISTER', value)
  },
  toggleSidenav ({commit}) {
    commit('COLLAPSE_SIDENAV')
  },
  setOneEssayId ({commit}, value) {
    commit('ONE_ESSAY_ID', value)
  }
}
