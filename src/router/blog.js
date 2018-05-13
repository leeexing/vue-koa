/**
 * 博客内容路由
 */
import Login from '@/components/Login/login'
import TodoList from '@/components/TodoList/todolist'
import Topic from '@/components/topic/topicList'
import NstsCourse from '@/components/nsts/NstsCourse'
import Keyboard from '@/components/nsts/Keyboard'
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
  },
  {
    path: '/nsts/course',
    component: NstsCourse
  },
  {
    path: '/nsts/keyboard',
    component: Keyboard
  }
]

export default blogRoute
