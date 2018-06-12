/**
 * 混入
 * 就是定义一部分公共的方法或者计算属性，然后混入到各个组件中使用，方便管理与统一使用
 * 1. 如果组件中定义的方法与混入对象中的方法/属性一样，组件中的优先级大于混入对象中的
 * 2. 混入对象中可以定义抽象方法，使用混入的组件必须重写该方法
 * 3. 使用方式
 *    mixins: [mixinCommon],
 *    name: 'login'
*/

import {mixinCommon, mixinAdmin} from './mixinTest'
import mixinChart from './mixinChart'

export {
  mixinChart,
  mixinCommon,
  mixinAdmin
}
