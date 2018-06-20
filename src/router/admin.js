import Home from '@/page/admin/home/AdminIndex'
import Userlist from '@/page/admin/user/UserList'
import UserEdit from '@/page/admin/user/UserEdit'
import AMap from '@/page/admin/Map/Map'
import Article from '@/page/admin/article/ArticalList'
import ArticalAdd from '@/page/admin/article/ArticalAdd'
import ArticalEdit from '@/page/admin/article/ArticalEdit'
import Category from '@/page/admin/article/Category'
import OneIndex from '@/page/admin/One/OneIndex'
import OneEssay from '@/page/admin/One/OneEssay'
import OneMusic from '@/page/admin/One/OneMusic'
import Music from '@/page/admin/Music/Music'
import Setting from '@/page/admin/setting/Setting'
import Martina from '@/page/admin/chat/Martina'
import Webgl from '@/page/admin/chat/Webgl'
import Admin from '@/page/Admin'

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
        path: 'user',
        name: 'userlist',
        component: Userlist,
        children: [{
          path: 'add',
          name: 'userEdit',
          component: UserEdit
        }]
      },
      {
        path: 'article',
        name: 'Article',
        component: Article,
        children: [{
          path: 'add',
          name: 'ArticleAdd',
          component: ArticalAdd
        }, {
          path: 'edit',
          name: '文章编辑',
          component: ArticalEdit
        }]
      },
      {
        path: 'category',
        name: '文章分类',
        component: Category
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
        path: 'setting',
        name: '相关设置',
        component: Setting
      }
    ]
  }
]

export default adminRoute
