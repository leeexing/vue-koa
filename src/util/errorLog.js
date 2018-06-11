/**
 * 错误捕获
 * 1. 不能捕获异步错误，这部有点鸡肋🐎
 * 2. 需要设置只在生产环境使用。添加判断 if (process.env.NODE_ENV === 'production') {//...}
 * 3. 还是可以 继续考虑使用 log4js 日志管理模块
 */
import Vue from 'vue'
import store from '@/store'

Vue.config.errorHandler = function (err, vm, info, a) {
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    console.log(`%c ${err} - ${info}`, 'background:#f00;color:#fff')
  })
}
