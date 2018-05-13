/**
 * 培训系统路由
 */
import NstsCourse from '@/components/nsts/NstsCourse'
import Keyboard from '@/components/nsts/Keyboard'

const nstsRoute = [
  {
    path: '/nsts/course',
    component: NstsCourse
  },
  {
    path: '/nsts/keyboard',
    component: Keyboard
  }
]

export default nstsRoute
