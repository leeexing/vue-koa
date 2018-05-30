/**
 * 培训系统路由
 */
import NstsCourse from '@/page/nsts/NstsCourse'
import KeyBoard from '@/page/nsts/KeyBoard'
import NstsIndex from '@/page/nsts/NstsIndex'

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
