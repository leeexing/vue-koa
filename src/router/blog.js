/**
 * 博客内容路由
 */
import Login from '@/components/login/Login'
import NotFound from '@/components/common/TheNotFound'
import NoAuthorization from '@/components/common/TheNoAuth'
import ServerError from '@/components/common/TheServerError'
import TodoList from '@/page/blog/todolist/TodoList'
import About from '@/page/blog/about/About'
import Setting from '@/page/blog/setting/Setting'
import ArticleList from '@/page/blog/article/ArticleList'
import ArticleDetail from '@/page/blog/article/ArticleDetail'
import Albums from '@/page/blog/album/Albums'
import AlbumDetail from '@/page/blog/album/AlbumDetail'
import Photos from '@/page/blog/album/Photos'
import Blog from '@/page/blog/Blog'

const blogRoute = [
  {
    path: '/',
    redirect: to => {
      return {name: 'Login'}
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/todo',
    name: 'Todolist',
    component: TodoList
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '',
    component: Blog,
    redirect: 'articles',
    children: [
      {
        path: 'articles',
        name: 'ArticleList',
        component: ArticleList
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail
      },
      {
        path: 'album',
        name: 'album',
        component: Albums
      },
      {
        path: 'album/:id',
        name: 'AlbumDetail',
        component: AlbumDetail
      },
      {
        path: 'photos',
        name: 'photos',
        component: Photos
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting
      }
    ]
  },
  {
    path: '/401',
    name: 'noAuthorized',
    component: NoAuthorization
  },
  {
    path: '/500',
    name: 'serverError',
    meta: {
      name: 'leeing'
    },
    component: ServerError
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

export default blogRoute
