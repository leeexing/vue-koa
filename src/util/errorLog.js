/**
 * 错误捕获
 * 不能捕获异步错误，这部有点鸡肋🐎
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
