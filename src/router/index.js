import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {getToken} from '../util/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

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
  if (to.path === '/' || to.path === '/login') {
    next()
  } else {
    if (token) {
      if (to.path.startsWith('/admin')) {
        // console.log(store.state.isAdmin, this.a.app.$store.state)
        if (store.state.isAdmin) {
          NProgress.start()
          next()
        } else {
          next('/leeing')
        }
      } else {
        NProgress.start()
        next()
      }
    } else {
      next('/')
    }
  }
})
router.afterEach(transition => {
  NProgress.done()
})

export default router
