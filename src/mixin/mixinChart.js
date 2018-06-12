/**
 * chart 图标用到的 mixin
 * 1. 使用mixin的好处就是，组件之间的共性可以很简洁的书写
 * 2. 不可滥用，避免方法冲突和覆盖
 */
import {debounce} from '@/util'

export default {
  mounted () {
    this._resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    })
    window.addEventListener('resize', this._resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._resizeHandler)
  }
}
