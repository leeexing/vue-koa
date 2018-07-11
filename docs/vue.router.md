# router

> vue-router

## addRoutes

> 动态添加更多的路由规则。参数必须是又给符合 `routes` 选项要求的数组

```js
router.addRoutes(routes: Array<RouteConfig>)
```

*卖点*：实现权限管理
### 实现思路

1. 创建vue实力的时候将vue-router挂载，但这个时候vue-router挂载一些登陆或者不用权限的公用的页面
2. 当用户登陆之后，获取用户的 role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表
3. 调用router.addRoutes(store.getters.addRouters) 添加用户可访问的路由
4. 使用vuex 管理路由表，根据vuex中可访问的路由渲染侧边栏组件

### 具体代码

```js
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/Readme',
    // name: 'Readmehome',
    index: 'Readme',
    meta: {
      title: 'Readme',
      icon: 'el-icon-menu'
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'Readme',
        path: '/',
        meta: { title: 'Readme', icon: 'el-icon-menu' },
        component: resolve => require(['../components/page/Readme.vue'], resolve)
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    // name: 'permissionhome',
    meta: {
      title: 'permission',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'permission',
        path: '/permission',
        meta: {
          title: 'permission', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/permission.vue'], resolve)
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
```

## 编程式导航

```js

```

```js
this.$router.push({path: '/aobut'})
this.$router.push({path: 'NotFound'})
this.$router.push({path: 'about', params: {id: 45, name: 'leeing'}})
// 带参数查询， 变成 /todolist?plan=private&id=23
this.$router.push({path: 'todolist', query: {plan: 'private', id: 23}})
```

## props

如果 props 被设置为 true，route.params 将会被设置为组件属性。

如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。

```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})

URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
```

**请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。**
如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

## 路由元信息

> 只能再route定义的时候写

```js
// push的时候不能传meta信息
  ...
  {
    path: '/500',
    name: 'serverError',
    meta: {
      name: 'leeing'
    },
    component: ServerError
  },
  ...
```

## 钩子函数

router.beforeRouter()

```js
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
```

有个问题就是：

1. store直接从 `store/index` 里面导入，可以获取到实时的 state 数据
2. stote可以通过 `route` 里面的 this 获取到
3. store 里面的数据，经不起浏览去刷新。一刷新登陆时保存的一些用户信息（例如是否为管理员）就消失了

## 参考

[1](https://router.vuejs.org/zh-cn/essentials/navigation.html)
[2.权限管理](https://juejin.im/post/5a97e41bf265da23a048fa20?utm_medium=fe&utm_source=weixinqun)