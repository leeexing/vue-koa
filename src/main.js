import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './style/index.scss'
require('./assets/css/blog.css')

// Vue全局使用 Element-UI 布局模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引用新浪表情包
// import VueSinaEmotion from 'vue-sina-emotion'
// Vue.use('vue-sina-emotion', VueSinaEmotion)

// 图标
// import 'font-awesome/css/font-awesome.css'

// 1、axios
import axios from 'axios'
Vue.prototype.$http = axios // Vue.use(axios) 没有官方文档要求需要这么使用，这么使用会报错 protocol
// 2、moment
import Moment from 'moment'
Object.defineProperty(Vue.prototype, '$moment', {value: Moment}) // 很喜欢这种‘优雅’的扩展方式
// 高德地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '2e0abcc359177669f4ebeb9210891452',
  plugin: ['AMap.Geolocation', 'AMap.Autocomplete',
    'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    Bus: new Vue() // 用于非父子组件之间通信的通道
  }
})
