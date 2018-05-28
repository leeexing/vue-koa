/**
 * 博客内容路由
 */
import Login from '@/components/login/Login'
import NotFound from '@/components/common/TheNotFound'
import ServerError from '@/components/common/TheServerError'
import TodoList from '@/views/blog/todolist/TodoList'
import About from '@/views/blog/about/About'
import Setting from '@/views/blog/Setting'
import ArticleList from '@/views/blog/topic/ArticleList'
import ArticleDetail from '@/views/blog/topic/ArticleDetail'
import Blog from '@/views/Blog'

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
    path: '/todolist',
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
