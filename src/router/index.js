import Vue from 'vue'
import Router from 'vue-router'

import AdminRoute from '@/router/admin'

import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'
import Topic from '@/components/topic/topicList'

// import Home from '@/components/admin/firstpage'
// import Userlist from '@/components/admin/userlist'
// import Artical from '@/components/admin/artical'
// import Category from '@/components/admin/category'
// import AddNewArtical from '@/components/admin/addNewArtical'
// import AMap from '@/components/admin/Map/map'
// import OneIndex from '@/components/admin/One/one'
// import OneEssay from '@/components/admin/One/essay'
// import OneMusic from '@/components/admin/One/music'
// import Music from '@/components/admin/Music/music'
// import NstsTrain from '@/components/admin/Music/nsts'
// import About from '@/components/admin/About/about'
// import Setting from '@/components/admin/setting'
// import Martina from '@/components/admin/chat/martina'
// import Webgl from '@/components/admin/chat/webgl'
// import DR from '@/components/admin/chat/dr'

import NstsCourse from '@/components/nsts/NstsCourse'
import Keyboard from '@/components/nsts/Keyboard'
import index from '@/views/Blog'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: to => {
        return {name: 'Login'}
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: TodoList
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/',
          name: 'Topic',
          component: Topic
        }
      ]
    },
    {
      path: '/nsts/course',
      component: NstsCourse
    },
    {
      path: '/nsts/keyboard',
      component: Keyboard
    },
    ...AdminRoute
  ]
})

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
