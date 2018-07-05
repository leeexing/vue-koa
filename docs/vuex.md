This is the docs of Vuex

> 遇到的问题

## action

> 不要乱用

**前点**
1. Mutation 必须是同步函数
2. Action 提交的是 mutation，而不是直接变更状态
3. Action 可以包含任意 `异步操作`

**强调**
1. 如果不是异步的请求数据，不要使用这个方法
2. 如果只是简单的设置（更改）`state` 的某个状态，使用 `mutation` 就行
3. 正确区分使用 `this.$store.commit()` & `this.$store.dispatch()`
4. 不要为了使用 dispatch 而使用

## 状态模块化

> modules

文件结构
```js
|__/store
  |__modules/
    |__blog.js
    |__admin.js
    |__todo.js
  |__getters.js
  |__index.js
```

**几点注意：**
1. modules 可以按模块区分，但是这里面主要写 `state`, `mutations`, `actions`
2. `getters` 需要直接获取的一般不是很多，所以可以直接单独出一个文件出来

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


## 方案三 更新时再调接口获取

> 也算是一个方法

就是在 比如 `App.vue` 文件中的 `created` 方法中，调用接口获取需要实时更新的用户设置或者基本信息

```js
created () {
  // 页面一刷新就及时调取这部分信息
  this.$store.dispatch('getUserInfo')
  this.$store.dispatch('getAppTheme')
  this.$store.dispatch('getSystemSetting')
}
```


## 参考

[自己改装localStorage存储vuex状态](http://www.jb51.net/article/117701.htm)
[vuex-along](https://github.com/boenfu/vuex-along)
