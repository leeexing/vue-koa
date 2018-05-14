import Home from '@/views/admin/FirstPage'
import Userlist from '@/views/admin/user/UserList'
import AMap from '@/views/admin/Map/Map'
import Artical from '@/views/admin/article/ArticalList'
import Category from '@/views/admin/article/Category'
import AddArtical from '@/views/admin/article/AddArtical'
import OneIndex from '@/views/admin/One/OneIndex'
import OneEssay from '@/views/admin/One/OneEssay'
import OneMusic from '@/views/admin/One/OneMusic'
import Music from '@/views/admin/Music/Music'
import NstsTrain from '@/views/admin/Music/Nsts'
import Setting from '@/views/admin/Setting'
import Martina from '@/views/admin/chat/Martina'
import Webgl from '@/views/admin/chat/Webgl'
import DR from '@/views/admin/chat/DR'
import Admin from '@/views/Admin'

const adminRoute = [
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: Userlist
      },
      {
        path: 'artical',
        name: 'Artical',
        component: Artical
      },
      {
        path: 'category',
        name: '文章分类',
        component: Category
      },
      {
        path: 'artical/addnew',
        name: '新增文章',
        component: AddArtical
      },
      {
        path: 'map',
        name: '地图',
        component: AMap
      },
      {
        path: 'one',
        name: '一个',
        component: OneIndex
      },
      {
        path: 'one/essay',
        name: '一个-文章',
        component: OneEssay
      },
      {
        path: 'one/music',
        name: '一个-音乐',
        component: OneMusic
      },
      {
        path: 'music',
        name: '音乐-Music',
        component: Music
      },
      {
        path: 'nsts',
        name: '培训-课件',
        component: NstsTrain
      },
      {
        path: 'martina',
        name: '培训-聊天',
        component: Martina
      },
      {
        path: 'webgl',
        name: 'webgl试验田',
        component: Webgl
      },
      {
        path: 'dr',
        name: 'DR图像',
        component: DR
      },
      {
        path: 'setting',
        name: '相关设置',
        component: Setting
      }
    ]
  }
]

export default adminRoute
