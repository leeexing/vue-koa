/**
 * 培训系统路由
 */
import NstsCourse from '@/views/nsts/NstsCourse'
import KeyBoard from '@/views/nsts/KeyBoard'
import NstsIndex from '@/views/nsts/NstsIndex'

const nstsRoute = [
  {
    path: '/nsts',
    meta: {
      auth: false
    },
    component: NstsIndex
  },
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
