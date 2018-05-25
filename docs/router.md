# router

> vue-router

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