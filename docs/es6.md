This is project of ES6

> 时刻学习

## import & export

import 没有数据的问题

```js
// mixinCom.js

const mixinCommon = {
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // ...
    }
  }
}

const mixinAdmin = {
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // ...
    }
  }
}

export {
  mixinCommon,
  mixinAdmin
}
```

```js
// ~mixin/index.js
import mixinCom from './mixinCom'
// import * as mixinCom from './mixinCom' // the same

console.log(mixinCom) // undefined

export {
  ...mixinCom // 这里报错，因为前面就是 undefined
}
```

问题的出现还是在，上面的 `export { //...}`
这样的模块导出，import的时候，需要用到解构才行

**解决方法**

```js
export default {
  mixinCommon,
  mixinAdmin
}
```

FIXME: 这是为什么呢？

如果我要这么写，还是会报错的

```js
import mixins from './mixinCom'

export {
  ...mixins
}
```

**小结**
1. 用 export default {} ，import 的时候就不能用 {moduleName} 这种解构

共同点：
export与export default均可用于导出常量、函数、文件、模块等

区别：
1.在一个文件或模块中，export、import可以有多个，export default仅有一个
2.通过export方式导出，在导入时要加{}，export default则不能加

## 参考

1. [export 的一个讲解](https://segmentfault.com/q/1010000011164969/a-1020000011165656)