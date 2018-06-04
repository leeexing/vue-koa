/**
 * Admin 状态
 */
const admin = {
  state: {
    theme: 'default'
  },
  mutations: {
    TOGGLE_THEME (state) {

    }
  },
  actions: {
    toggleTheme ({commit}) {
      commit('TOGGLE_THEME')
    }
  }
}

export default admin
