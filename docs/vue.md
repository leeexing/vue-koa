This is docs of vue

## 动态组件 & 异步组件 ![3]

1. <component v-bind:is="theShowComponent"></component>
2. 在动态组建上使用 keep-alive. 避免反复重渲染导致性能问题
    <keep-alive>
        <component v-bind:is="theShowComponent"></component>
    </keep-alive>
3. 异步组件。在需要的时候才异步加载组件并渲染。通常用在 touter 中
    ```js 
    {path: '/login', component: () => import('@/component/login'), hidden: true },
    {path: '/401', component: () => import('@/component/errorPage/401'), hidden: true },
    ```

    处理加载状态
    ```js
    {path: '/home', component: () => {
        component: import('@/component/home.vue'),
        loading: loadingComponent,
        error: ErrorComponent,
        delay: 200,
        timeout: 3000
    }}
    ```

## directive ![1]

> 自定义指令

### 几个钩子函数

1. bind
2. inserted
3. update
4. componentUpdated
5. unbind

### 钩子函数的参数

1. el
2. binding
  * name
  * vlaue
  * oldValue
  * expression
  * arg
  * modifiers
3. vnode
4. oldVnode

### 举一个🌰

```html
<div id="hook" v-auth:foo.a.b="message"></div>
```

name:auth
value: message
arg:foo
modifiers: {a: true, b: true}

**注意**

1. 了解每个钩子函数什么时候被调用，很重要！很重要！很重要
2. 要想删除绑定的元素，不能在 `bind` 的时候进行删除，只能在 `inserted` 的时候删除。`el.parentNode.removeChild(el)`

### 自己做一个🍅

`Blog.vue` 文件中有一个 `About Me` 的菜单, 通过绑定 v-menu

```js 
// directive/menu.js
import {SesStorage} from '@/util/storage'

const vueMenu = {}
vueMenu.install = Vue => {
  Vue.directive('menu', {
    inserted (el, binding, vnode, oldVnode) {
      let menu = SesStorage.getItem('menu')
      let {arg} = binding
      console.log(el, el.parentNode)
      console.log(menu, binding)
      if (!menu.includes(arg)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
```

```html
<!-- Blog.vue -->

<p class="about-me" v-menu:about="1" @click="$router.push('/about')">About Me</p>
```

### waves ![2]

> 这是个GitHub上面的例子，可以好好看一下别人是怎么实现的

❗❗❗**必要的时候需要查看一下 css.md 中的 getBoundingClientRect**

上面有一段代码，看了之后，很值得学习

```js
import './waves.css'
import Waves from './waves.js'

export default {
    install(Vue, options = { name: 'waves' }) {
        Vue.directive(options.name, {
            inserted(el, binding) {
                let classes = ['button', 'circle', 'block', 'float', 'light', 'classic']
                    .filter(cls => binding.modifiers[cls])
                    .map(cls => `waves-${cls}`)
                Waves.attach(el, classes)
            }
        })
        Vue.mixin({
            created: function() {
                Waves.init(options);
            }
        })
    }
}
```

同时，这虽然代码不多，但是可以很好的了解如何写 `node 包`

## 参考

1. [自定义指令-官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
2. [vue-waves](https://github.com/Teddy-Zhu/vue-waves)
3. [动态组建](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)