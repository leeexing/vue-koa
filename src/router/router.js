/**
 * created by leeing on 8/25
 * 还有这种操作
 * 实现按需加载
 * r 代表 resolve。工厂函数接受一个resolve 用于解析组件的回调函数，其参数是所获取的组件选项；在收到从服务器下载的组件定义时调用。
 * 也可以条用reject（reason）指示加载失败
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '',
    component: resolve => require(['@/components/Login/login'], resolve)
    // component: r => require.ensure([], () => r(require('../components/Login/login.vue')), 'login')
  }, {
    path: '/login',
    // component: resolve => require(['@/components/Login/login'], resolve)
    component: r => require.ensure([], () => r(require('../components/Login/login.vue')), 'login')
  }, {
    path: '/todolist',
    component: resolve => require(['@/components/TodoList/todolist'], resolve)
    // component: r => require.ensure([], () => r(require('../components/TodoList/todolist.vue')), 'todolist')
  }]
})

/* 这种写法由于已经有一个app ，那么 main.js 里面就不需要在配置 components: {app} 了 */
// import App from '../App'
/* export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: App,
    children: [{
      path: '',
      component: resolve => require(['@/components/Login/login'], resolve)
      // component: r => require.ensure([], () => r(require('../components/Login/login.vue')), 'login')
    }, {
      path: '/login',
      component: resolve => require(['@/components/Login/login'], resolve)
      // component: r => require.ensure([], () => r(require('../components/Login/login.vue')), 'login')
    }, {
      path: '/todolist',
      component: resolve => require(['@/components/TodoList/todolist'], resolve)
      // component: r => require.ensure([], () => r(require('../components/TodoList/todolist.vue')), 'todolist')
    }]
  }]
}) */

/* 这种做法是导出一个 routes 内容 */
/* export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../components/Login/login')), 'login')
  }, {
    path: '/login',
    component: r => require.ensure([], () => r(require('../components/Login/login')), 'login')
  }, {
    path: 'todolist',
    component: r => require.ensure([], () => r(require('../components/TodoList/todolist')), 'todolist')
  }]
}] */

