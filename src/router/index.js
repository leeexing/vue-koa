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

const whiteList = ['/login', '/about'] // 不需要跳转的白名单
// const hasPermission = function (roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) {
//     return true
//   }
//   if (!permissionRoles) {
//     return true
//   }
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// 路由监控
router.beforeEach((to, from, next) => {
  const token = getToken()
  NProgress.start()
  if (token) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      if (to.path.startsWith('/admin')) {
        // console.log(store.state.isAdmin, this.a.app.$store.state)
        if (store.state.isAdmin) {
          next()
        } else {
          next('/articles')
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(transition => {
  NProgress.done()
})

export default router
