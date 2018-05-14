## 关于 vue-router 的说明
* 可以有两种方法实现路由配置；分别是 index.js 和 router.js 里面书写的两种方法
* router-lazy 是一种能懒加载的方法。
* 具体实现的要点看下面

## 按需加载的理解

对于大型的web应用来说，打包构建项目时，将所有的代码文件压缩成一个文件是不合适的，在部分代码文件只有在特殊情况下才被需要的情况下无疑是一种浪费。webpack提供了将代码文件分块的能力。 
这里需要注意的是：webpack并不是把原来的一个大文件，简单的进行拆分，而是在这个基础上，提供了按需加载特定模块的能力。这样使得应用在最初加载代码量可以尽量的小。



## 知识点补充
 ```
const Foo = resolve => {
  // require.ensure 是 webpack 的特许语法，用来设置 code-split point （代码分块）
  require.ensure(['../components/Hello.vue'], () => {
    resolve(require('../components/Hello.vue'))
  })
}
```

### 还有另一种代码分块的语法，使用AMD风格的 require，于是就更简单了
```
const Hello = resolve => require(['../components/Hello.vue'], resolve)
```

### 不需要改变任何路由配置，跟之前一样使用 Foo

```
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {path: '/hello', component: Hello}
  ]
})
```
## 方案二 把组件按组分块
  有时候我们想把某个路由下的所有组件都打包在同个异步 chunk 中，只需要给 chunk命名 提供 require.ensure 第三个参数作为 chunk 的名称

```
const Foo = r => require.ensure([], () => r(require('../components/Hello.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('../components/bar.vue')), 'group-foo')
const Cat = r => require.ensure([], () => r(require('../components/cat.vue')), 'group-foo')
```
webpack 将相同 chunk 下的所有异步模块打包到一个异步模块里面 -- 这也意味着我们无需明确列出 require.ensure 的依赖（传空数组就行）


## 解释

```
webpack 的 code split 可以使用 webpack 的 require.ensure 特殊语法或者使用 AMD 风格的 callback-require 语法，以 AMD 风格的 callback-require 语法为例——

全局注册 Async Component：
 
let myAsyncComponent = resolve => {
 require(['./my-async-component'], resolve)
}
Vue.component('async-webpack-example', myAsyncComponent)
 

局部注册 Async Component，单文件组件中 script 块内容：
 
let myAsyncComponent = resolve => {
 require(['./my-async-component'], resolve)
}
 
// Vue 扩展实例选项，其他选项略
export default {
 components: {
 'async-webpack-example': myAsyncComponent
 }
}
 
在使用 vue-router 时，为实现不同路由下的组件异步加载，在路由映射中可以使用同样的方式来设置路由项的 component 属性。
```
这里的 myAsyncComponent 被定义为一个工厂函数，在需要时才会以 Vue 或者 vue-router 定义的用于解析组件选项的 resolve 回调函数（是的，在 Vue 和 vue-router 中有两个不同的解析组件选项的函数）为参数执行 callback-require 函数（resolve 回调函数的参数是组件选项），这样，在执行打包脚本时，my-async-component.vue 文件会被单独打包成一个文件，并且仅当该组件被使用时才会加载。

当要求异步加载的组件较多时，将会生成更多的单个文件，对于前端性能而言，虽然每个文件更小了，但可能意味着更多的网络连接建立和关闭的开销，因此在前端优化的实践中，通常需要在文件数量和单个文件大小之间取得平衡。

所以，方案二 把组件按组分块 是有必要的

[传送门](http://www.jb51.net/article/105881.htm)

本文介绍如何将多个组件合并打包成一个单独的文件，一方面可以减少代码块的数量，另一方面，如果合并打包的这些组件在不同地方多次重复使用，由于 Vue 的缓存机制，可以加快后续组件的加载速度，并且如果这些通用组件长时间不会变化（如 UI 相关的组件），打包生成的文件也长期不会变化，可以充分利用浏览器的缓存功能，实现前端加载速度的优化。

[传送门2](http://blog.csdn.net/dandan_feifei/article/details/72622017?locationNum=1&fps=1)

优化：如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。 
webpack require-ensure 只是加载组件，并不会执行，若要执行，需要借助传进去的require参数。 

1、我们需要做的是把路由对应的组件定义成异步组件,进行懒加载：

const Home = r => reuqire.ensure([], () => r(reuqire('../components/Home')), 'Home')
const IM = r => reuqire.ensure([], () => r(reuqire('../components/IM')), 'IM')
const My = r => reuqire.ensure([], () => r(reuqire('../components/My')), 'My')

2、执行npm run build后，生成的build文件夹目录：

![图片](http://img.blog.csdn.net/20170522130747572?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZGFuZGFuX2ZlaWZlaQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


可以看出app.xxx.js被分成了一个个小的js文件，根据按需加载，这样就大大缩短了项目的加载时间，更加高效。

3、启动服务，加载时

## 新颖的写法

```js
/* 这种写法由于已经有一个app ，那么 main.js 里面就不需要在配置 components: {app} 了 */
// import App from '../App'
export default new Router({
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
})
```