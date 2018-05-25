import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from '../util/auth'
import store from '@/store'

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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由监控
router.beforeEach((to, from, next) => {
  const token = getToken()
  // console.log(token)
  // console.log(to.path)
  if (to.path === '/' || to.path === '/login') {
    next()
  } else {
    if (token) {
      if (to.path.startsWith('/admin')) {
        console.log('++++', store.state.isAdmin)
        console.log(this.a.app.$store.state)
        console.log(store.state.isAdmin, '>>>>', from, '\n>>>', to)
        if (store.state.isAdmin) {
          next()
        } else {
          next('/leeing')
        }
      } else {
        next()
      }
    } else {
      next('/')
    }
  }
})

export default router
