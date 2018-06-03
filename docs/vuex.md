# vuex

> 遇到的问题

## vuex 刷新后状态不能保存

### 方案一：localStorage || sessionStorage

> 自己封装方法进行数据保存

具体实现代码看 util/storage & store/mutation

遇到的一个小问题
修改 `state` 的时候，需要进行软复制

```js
let storageState = {
  username: state.username,
  isAdmin: state.isAdmin
}
state = {...state, storageState}

这样是不行的。因为这时的state不是同一个对象了
```

需要这样

```js
Object.assign(state, storageState)
```

TODO:
1. 如何实现可配置那些变量需要进行本地存储还需要考虑一下
2. 刷新的时候，如何监测。不可能只在 app.vue 这个组件里面监听

FIXME:
将state先进行加密保存，有个问题就是，加密的字符串不能太长！

**问题**
1. 什么时候进行刷新获取呢？答案是，在设置state中找一个变量进行判断，如何该值还是初始值，那么就该更新了

```js
computed: mapState({
  username (state) {
    if (state.username === '') {
      this.$store.dispatch('FLASH_STATE')
    }
    return state.uesrname
  }

})
```

### 方案二：vuex-along

> 本质上也是利用了localstorage

```js
import vuexAlong from 'vuex-along'

// 两种方式

vuexAlong.watch(['username'], true)

vuexAlong.watchSeesion(['username'], true)
vuexAlong.onlySession(true)

true: array 作为要保存的列表
false： array 作过滤列表

sessionStorage

vuex-along:"JTdCJTIydXNlcm5hbWUlMjIlM0ElMjJsZWVpbmclMjIlN0Q="

```

可以看出，保存的是结果加密的字符

## 参考

[自己改装localStorage存储vuex状态](http://www.jb51.net/article/117701.htm)
[vuex-along](https://github.com/boenfu/vuex-along)
