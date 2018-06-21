/**
 * created by leeing on 2817/8/24
 * store 的 统一 入口文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)
// TODO:思考，要是我去保存这些数据，如何实现
// vuexAlong.watch(['username', 'userID', 'isAdmin'], true)
vuexAlong.watchSession(['username', 'isAdmin', 'userID', 'avatarUrl'], true)
vuexAlong.onlySession(true)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexAlong]
})
