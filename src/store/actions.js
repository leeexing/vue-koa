/**
 * created by leeing on 8/24
 */

export default {
  // 保存用户名
  save_username ({commit}) {
    commit('SAVE_USERNAME')
  },
  // 关闭遮罩
  close_mask ({commit}) {
    commit('CLOSE_MASK')
  },
  // 显示遮罩
  show_mask ({commit}) {
    commit('SHOW_MASK')
  },
  // 注册
  switch_register ({commit}, value) {
    commit('SWITCH_REGISTER', value)
  },
  toggleSidenav ({commit}) {
    commit('COLLAPSE_SIDENAV')
  },
  setIsAdmin ({commit}, value) {
    commit('SET_ADMIN', value)
  },
  setOneEssayId ({commit}, value) {
    commit('ONE_ESSAY_ID', value)
  }
}
