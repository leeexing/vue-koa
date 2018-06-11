import waves from './waves'

const vueWaves = {}
vueWaves.install = Vue => {
  Vue.directive('waves', waves)
}

export default vueWaves
