This is project of ES6

> 时刻学习

## 平时学习的摘录

1. 在 `react` + `redux` 技术栈下，不可变数据解构是大家都提倡的做法。我们在平时的业务代码开发中，就需要有 `immutable` 的意识，善用 `ES6` 语法，就可以解决我们大部分的场景。【保持数据的一致性。产生污染数据】
2. 在工作时间内去丰富自己的内在是一种不错的方式。每天下班之前，我会简要浏览 `github` 的 'Trends' 页面，并start 一些我认为有意思的项目。会在30分钟回顾他们，在我的下一个POC中小试牛刀，甚至在工作中使用它们
3. 库，本质上是一些函数的集合。每次调用函数，实现一个特定的功能，接着把 `控制权` 交给使用者；（jQuery）
   框架，是一套完整的解决方案。使用框架的时候，需要把你的代码放到框架合适的地方，框架会在合适的时机调用你的代码（vue）
   核心点：谁起到主导作用（控制反转）

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