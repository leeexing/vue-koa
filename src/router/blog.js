/**
 * 博客内容路由
 */
import Login from '@/components/login/Login'
import TodoList from '@/views/blog/todolist/TodoList'
import TopicList from '@/views/blog/topic/TopicList'
import About from '@/views/blog/about/About'
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
    path: '/leeing/about',
    name: 'about',
    component: About
  },
  {
    path: '/leeing',
    component: Blog,
    children: [
      {
        path: '/',
        name: 'Topic',
        component: TopicList
      }
    ]
  }
]

export default blogRoute
