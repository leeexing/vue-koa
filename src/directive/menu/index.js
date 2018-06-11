/**
 * 权限指令
 * 1. 用户没有相应的权限时，页面上的某些元素（例如：菜单）会被清除。用户权限从 storage 里面获取
 * 2. storage数据需要每次刷新的时候重新调取接口获取新的数据
 */
import {SesStorage} from '@/util/storage'

const vueMenu = {}
vueMenu.install = Vue => {
  Vue.directive('menu', {
    inserted (el, binding, vnode, oldVnode) {
      let menu = SesStorage.getItem('menu')
      let {arg} = binding
      // console.log(el, el.parentNode)
      // console.log(menu)
      // console.log(binding)
      if (!menu.includes(arg)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}

export default vueMenu
