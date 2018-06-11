/**
 * 点击元素，背景出现波动效果
 */
import waves from './waves'

const vueWaves = {}
vueWaves.install = Vue => {
  Vue.directive('waves', waves)
}

export default vueWaves
