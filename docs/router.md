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

## 参考

[1](https://router.vuejs.org/zh-cn/essentials/navigation.html)