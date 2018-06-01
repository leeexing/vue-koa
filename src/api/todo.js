/**
 * TODOS
*/
import http from '@/util/http'

export default {
  getTodos (data) {
    return http.get('/api/blog/todos', data)
  },
  addTodo (data) {
    return http.post('/api/blog/todo', data)
  },
  getTodo (id, data) {
    return http.get('/api/blog/todo/' + id, data)
  },
  putTodo (id, data) {
    return http.put('/api/blog/todo/' + id, data)
  },
  deleteTodo (id, data) {
    return http.delete('/api/blog/todo/' + id, data)
  }
}
