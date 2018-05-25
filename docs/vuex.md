# vuex

> 遇到的问题

## vuex 刷新后状态不能保存

### 方案一：localStorage || sessionStorage


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

[vuex-along](https://github.com/boenfu/vuex-along)