This is docs of vue

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

## 参考

1. [自定义指令-官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)