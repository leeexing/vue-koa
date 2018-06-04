/**
 * TODO 状态
 */
const todo = {
  state: {
    status: 'finished'
  },
  mutations: {
    TOGGLE_STATUS (state, value) {
      state.status = value
    }
  },
  actions: {
    toggleStatus ({commit}, value) {
      commit('TOGGLE_STATUS', value)
    }
  }
}

export default todo
