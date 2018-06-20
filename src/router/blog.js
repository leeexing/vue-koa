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
import Blog from '@/page/Blog'

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
    path: '/leeing',
    component: Blog,
    children: [
      {
        path: '/',
        name: 'Articles',
        component: ArticleList
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail
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
