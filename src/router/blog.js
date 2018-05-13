/**
 * 博客内容路由
 */
import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'
import Topic from '@/components/topic/topicList'
import index from '@/views/Blog'

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
    path: '/index',
    component: index,
    children: [
      {
        path: '/',
        name: 'Topic',
        component: Topic
      }
    ]
  }
]

export default blogRoute
