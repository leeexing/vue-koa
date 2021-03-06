This is docs of vue

## 递归组件

	组件在它的模板内可以递归的调用自己，只有当它有 name 选项时才可以

```js
// treeMenus.vue
<template>
		<ul>
			<li v-for="(item,index) in list " >
				<p>{{item.name}}</p>
				<tree-menus :list="item.cList"></tree-menus>
			</li>
		</ul>
</template>

<script>
	import treeMenus from './treeMenu2.vue';
	export default{
		name:'treeMenus',
		props:{
			list: [
					{"name":"黄焖鸡米饭111111111",cList:[
						{"name":"二级黄焖鸡"},
						{"name":"one chicken",cList:[{"name":'三级黄焖鸡3333',cList:[{"name":"四级黄焖鸡"}]}]}
					]},
					{"name":"2222222222"},
					{"name":"黄焖鸡米饭33333333",cList:[
						{"name":"二级黄焖鸡"},
						{"name":"one chicken"}
					]},
				]
		}
	}
</script>
```

实际项目中不会一次性全部将整个数据渲染出来，而是类似于下拉菜单那样的效果

```css
	<ul>
		<li v-for="(item,index) in list " >
			<p  @click="changeStatus(index)">{{item.name}}</p>
			<tree-menus v-if="scopesDefault[index]" :list="item.cList"></tree-menus>
		</li>
	</ul>

	export default{
    name:'treeMenus',
    props:{
      list:Array
    },
    data(){
      return {
        scopesDefault:[],
        scopes:[]
      }
    },
    methods:{
      changeStatus(index){
        if(this.scopesDefault[index]==true){
          this.$set(this.scopesDefault,index,false);
        }else{
          this.$set(this.scopesDefault,index,this.scopes[index]);
        }
      },
      scope(){
        this.list.forEach((item,index)=>{
          this.scopesDefault[index]=false;
          if('cList' in item){
            this.scopes[index]=true;
            console.log(item,index);
          }else{
            this.scopes[index]=false;
          }
        });
      }
    },
    created(){
      this.scope();
    }
  }
```

## keep-alive

> 能在组件切换过程中将状态保留在内存中，防止重复渲染DOM

有一个属性 prop
1. include：字符串或正则表达式。只有匹配的组件会被缓存。
2. exclude：字符串或正则表达式。任何匹配的组件都不会被缓存。

*使用*
1. 可以在路由里面添加一个属性，是否需要保留状态。meta或者其他属性

```js
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

## beforeDestroy

还可以通过 `$once` 来监听定时器

```js
	this.timer = setInterval(() => {
		console.log(7)
		this.goooooal()
	}, 1000)
```

```js
this.$once('hook:beforeDestroy', () => {
	clearInterval(this.timer)
})
```

```js 方法一
beforeDestroy () {
		if (this.timer) {
		  clearInterval(this.timer)
		}
  },
```

## sync 修饰符

> 父子组件通信 & 同步父子组件数据

其实也只是一个语法糖

### 前言

1. 一般（之前）会使用 `props` 解决数据传递的问题
2. 通过 `ref` 属性在父组件中直接获取得到子组件的数据（👍之前没有尝试过）
3. 最新！！ 通过 `async` 实现数据 `双向绑定`，从而同步父子组件数据

*缺点*
破坏了单向数据流的简洁性，增加了分析数据时的难度

### 使用

```conf
<comp :foo.sync="bar"></comp>

<comp :foo="bar" @update:foo="val => bar = val"></comp>

// 当子组件需要更新 foo 的值，显式地触发一个 **更新** 事件

this.$emit('update:foo', newValue)
```

**注意**
个人觉得，这个方法虽然挺好，
1. 但也只是适用于简单改变父子组件的某个简单状态值
2. 如果被绑定的属性是一个对象，这就不好办了吧
3. 如果是要父子组件间通信，还是需要绑定事件，做进一步的逻辑处理

### 参考
[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)
[1](https://www.jianshu.com/p/6b062af8cf01)
[2](https://www.cnblogs.com/penghuwan/p/7473375.html)

## 皮肤设置

> 详见 css.md

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

prop:
	* include: 字符串或正则表达式。只有匹配的组件会被缓存。
	* exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。

结合router，缓存部分页面

```js
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

需要在router中设置router的元信息meta：

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


## mixin

> vue 混入

## Vue 类库 / 插件 ![4]

> 看看人家是如何写一个 vue 的插件的

### 1. 如何使用

```js
//首先下载安装
npm install vue2-barrage --save
//然后在引入到你的vue中
import barrage from "vue2-barrage";
//Vue调用
Vue.use(barrage);

//组件绑定mounted钩子函数内执行初始化方法，返回发送弹幕方法
mounted(){
	this.send = this.$start(this.$refs.barrage_wrap);
}
//vue的methods内任意方法里添加send方法，注意，请务必传入空对象参数
this.send({});

配置选项说明

text：发送弹幕的文字内容，默认为默认弹幕
color：字体颜色，默认为黑色
speed：弹幕速度，默认为5
classname：样式类名，目前有style1~3三种选择，分别代表蓝色、绿色、红色
```

### 2. vue 组件中

```html
<div class="barrage-wrap" ref="barrage"></div>
```

```js 组件中使用
  ...
  mounted () {
    this.send = this.$start(this.$refs.barrage)
    this.timer = setInterval(() => {
      this.goooooal()
    }, 1000)
  },
```

### 3. Vue 插件

Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

使用

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

// 也可以传入一个选项对象
Vue.use(MyPlugin, { someOption: true })
```

### 4. 举一个例子。底层是如何实现的

    总的来说，人家写得还是很简洁的。主要就是使用了一个 animate.js

```js
var animation = require("./animate.js");
require('./barrage.css')
module.exports = {
	install(Vue,options){
		Vue.prototype.$start = (barrage_target, section) => {
			barrage_target.style.overflow = "hidden";
			barrage_target.style.position = "relative";
			return this.send.bind(this,barrage_target,section);
		};
	},
	send:(...args) => {
		const [target, section=[0,1], options] = args,
		{text,color,classname,speed} = options,
		barrage = document.createElement("div"),
		max = Math.max(...section),
		min = Math.min(...section);

		barrage.classList.add("barrage");


		barrage.innerHTML = !text ? "默认弹幕" : text;
		classname && barrage.classList.add(classname);
		barrage.style.color = color;
		barrage.style.left = (target.offsetWidth) + "px";

		
		target.appendChild(barrage);
		if( max !== min ){
			barrage.style.top = (Math.random() * (max - min) + min) * (target.offsetHeight - barrage.offsetHeight) + "px";
		}else{
			barrage.style.top = Math.random() * (target.offsetHeight - barrage.offsetHeight) + "px";
		}

		animation(barrage, "left", target.offsetWidth + barrage.offsetWidth, speed, function() {
			barrage.parentNode.removeChild(barrage);
		})

	}
}
```

### animate.js 仅仅为了可以折叠

```js animate.js
//用于记录上次pos的临时变量
var target_point_x = null,
target_point_y = null;

var move = (function() {
	/**
	 * 动画逻辑
	 * @param  {动画目标} target       dom节点
	 * @param  {方向} direction    left top bottom right
	 * @param  {目标巨鹿} aim_distance 数字类型
	 * @param  {速度} speed        int
	 * @return {开始执行的函数}              函数类型
	 */
	return function(target, direction, aim_distance, speed) {
		speed = typeof speed === "number" ? speed : 5;
		var temp_target_point;
		direction === "left" && (temp_target_point = target_point_x = target_point_x !== null ? target_point_x - aim_distance : target.offsetLeft - aim_distance);
		direction === "right" && (temp_target_point = target_point_x = target_point_x !== null ? target_point_x + aim_distance : target.offsetLeft + aim_distance);
		direction === "top" && (temp_target_point = target_point_y = target_point_y !== null ? target_point_y - aim_distance : target.offsetTop - aim_distance);
		direction === "bottom" && (temp_target_point = target_point_y = target_point_y !== null ? target_point_y + aim_distance : target.offsetTop + aim_distance);
		return function() {
			if (direction === "left") {
				(target.offsetLeft > temp_target_point) ? (target.style.left = target.offsetLeft - speed + "px") : (target.style.left = temp_target_point + "px");
			} else if (direction === "right") {
				(target.offsetLeft < temp_target_point) ? (target.style.left = target.offsetLeft + speed + "px") : (target.style.left = temp_target_point + "px");
			} else if (direction === "top") {
				(target.offsetTop > temp_target_point) ? (target.style.top = target.offsetTop - speed + "px") : (target.style.top = temp_target_point + "px");
			} else if (direction === "bottom") {
				(target.offsetTop < temp_target_point) ? (target.style.top = target.offsetTop + speed + "px") : (target.style.top = temp_target_point + "px");
			}
			return temp_target_point;
		}
	}
})();

/**
 * 上下左右动画小插件
 * @param  {要执行动画的目标}   target       dom节点
 * @param  {方向}   direction    left,right,top,bottom
 * @param  {要移动的距离}   aim_distance  数字类型
 * @param  {速度}   speed        数字类型
 * @param  {回调函数} cb           函数
 * @return {fn}                真正的动画调用者
 */
function animation(target, direction, aim_distance, speed, cb = function() {console.log("callback called");} ) {
	cb = typeof speed === "function" ? speed : cb;
	var queueObj = [];
	//调用新的animation的时候，重置一下，不然每次都是叠加的
	target_point_x = null,
	target_point_y = null;
	queueObj.next = function(n_dir, queue_x, speed) {
		this.push({
			fn: move(target, n_dir, queue_x, speed),
			dir: n_dir,
			last_x: queue_x
		});
		return queueObj;
	}
	return (function() {
		/**
		 * 真正执行动画的
		 * @param  {判断时候结束的条件} ani      fn
		 * @param  {方向} real_dir left top bottom  right
		 * @return {动画队列数组}          用于依次开启动画的队列数组
		 */
		function real(ani, real_dir) {
			var temp = ani,
			tempArr;

			function fn() {
				if (real_dir === "left" || real_dir === "right") {
					if (target.offsetLeft !== temp()) {
						requestAnimationFrame(fn);
					} else {
						queueObj[0] && (tempArr = queueObj.shift());
						tempArr || cb();
						tempArr && real(tempArr.fn,  tempArr.dir);
					}
				} else if (real_dir === "top" || real_dir === "bottom") {
					if (target.offsetTop !== temp()) {
						requestAnimationFrame(fn);
					} else {
						queueObj[0] && (tempArr = queueObj.shift());
						tempArr || cb();
						tempArr && real(tempArr.fn,  tempArr.dir);
					}
				}
			}
			requestAnimationFrame(fn);
		}
		real(move(target, direction, aim_distance, speed),  direction);
		return queueObj;
	})();
}
module.exports = animation;
```


### 小结

**小结：![5]**
1. 必须要有一个 `install` 方法。通过全局方法 Vue.use() 使用插件：
2. 好好看看 `install` 方法里面的 return 。使用 __bind__ 方法，起到了固定部分参数的作用。很好的一个 `偏函数` 的使用案例。👍👍👍
    返回的就是一个偏函数 -- 结合例子，this.send 就是一个绑定了两个参数(barrage_target, section)的偏函数 -- 后面使用的时候
    this.send({}) 传递的就是第三个参数 `options` ，这一点做的实在是好
3. 

## 参考

1. [自定义指令-官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
2. [vue-waves](https://github.com/Teddy-Zhu/vue-waves)
3. [动态组建](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)
4. [Vue barrage 如何写类库](https://github.com/a13821190779/barrage/blob/master/npm_barrage/src/main.js)
5. [Vue 使用插件](https://cn.vuejs.org/v2/guide/plugins.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6)