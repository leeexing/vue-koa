/**
 * 后台相关接口
 */
import http from '@/util/http'

export default {
  getUsers (data) {
    return http.get('/api/blog/users', data)
  },
  deleteUser (id) {
    return http.delete('/api/blog/user/' + id)
  }
}
