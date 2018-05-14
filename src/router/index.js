import Vue from 'vue'
import Router from 'vue-router'

import BlogRoute from './blog'
import NstsRoute from './nsts'
import AdminRoute from './admin'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    ...BlogRoute,
    ...NstsRoute,
    ...AdminRoute
  ]
})

// 路由监控
/* router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('vue-koa-token')
  if (to.path === '/') { // 如果是跳转到登录页
    if (token !== null && token !== 'null') {
      next('todolist') // 如果有token 就转向todolist，不反悔登录页
    }
    next() // 否则跳转回登录页
  } else {
    if (token !== null && token !== 'null') {
      Vue.prototype.$http.default.headers.common['Authorization'] = 'Bearer ' + token
      next() // 如果有token就正常跳转
    } else {
      next('/') // 否则跳转回登录页
    }
  }
}) */

export default router
