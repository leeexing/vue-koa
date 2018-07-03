import Home from '@/page/admin/home/AdminIndex'
import Userlist from '@/page/admin/user/UserList'
import UserEdit from '@/page/admin/user/UserEdit'
import AMap from '@/page/admin/map/Map'
import Articles from '@/page/admin/article/Articles'
import ArticleAdd from '@/page/admin/article/ArticleAdd'
import ArticleEdit from '@/page/admin/article/ArticleEdit'
import Category from '@/page/admin/category/Category'
import CategoryEdit from '@/page/admin/category/CategoryEdit'
import OneIndex from '@/page/admin/one/OneIndex'
import OneEssay from '@/page/admin/one/OneEssay'
import OneMusic from '@/page/admin/one/OneMusic'
import Music from '@/page/admin/music/Music'
import Martina from '@/page/admin/chat/Martina'
import Webgl from '@/page/admin/chat/Webgl'
import Setting from '@/page/admin/setting/Setting'
import About from '@/page/admin/about/About'
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
        name: 'Articles',
        component: Articles,
        children: [{
          path: 'add',
          name: 'ArticleAdd',
          component: ArticleAdd
        }, {
          path: 'edit',
          name: '文章编辑',
          component: ArticleEdit
        }]
      },
      {
        path: 'category',
        name: '文章分类',
        component: Category,
        children: [{
          path: 'edit',
          name: '分类编辑',
          component: CategoryEdit
        }]
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
      },
      {
        path: 'about',
        name: '后台介绍',
        component: About
      }
    ]
  }
]

export default adminRoute
