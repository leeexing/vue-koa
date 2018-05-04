import Home from '@/components/admin/firstpage'
import Userlist from '@/components/admin/userlist'
import Artical from '@/components/admin/artical'
import Category from '@/components/admin/category'
import AddNewArtical from '@/components/admin/addNewArtical'
import AMap from '@/components/admin/Map/map'
import OneIndex from '@/components/admin/One/one'
import OneEssay from '@/components/admin/One/essay'
import OneMusic from '@/components/admin/One/music'
import Music from '@/components/admin/Music/music'
import NstsTrain from '@/components/admin/Music/nsts'
import About from '@/components/admin/About/about'
import Setting from '@/components/admin/setting'
import Martina from '@/components/admin/chat/martina'
import Webgl from '@/components/admin/chat/webgl'
import DR from '@/components/admin/chat/dr'
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
        component: AddNewArtical
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
      },
      {
        path: 'about',
        name: '有关于我',
        component: About
      }
    ]
  }
]

export default adminRoute
