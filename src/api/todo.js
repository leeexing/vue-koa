/**
 * TODOS
*/
import http from './http'

export default {
  getTodos (data) {
    return http.get('/api/blog/todos', data)
  },
  addTodo (data) {
    return http.post('/api/blog/todo', data)
  },
  getTodo (data) {
    return http.get('/api/blog/todo/', data)
  },
  putTodo (id, data) {
    return http.put('/api/blog/todo/' + id, data)
  },
  deleteTodo (id, data) {
    return http.delete('/api/blog/todo/' + id, data)
  }
}
