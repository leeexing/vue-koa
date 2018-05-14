/**
 * 培训系统路由
 */
import NstsCourse from '@/views/nsts/NstsCourse'
import KeyBoard from '@/views/nsts/KeyBoard'

const nstsRoute = [
  {
    path: '/nsts/course',
    component: NstsCourse
  },
  {
    path: '/nsts/keyboard',
    component: KeyBoard
  }
]

export default nstsRoute
