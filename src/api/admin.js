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
  },
  getMusics (data = {}) {
    return http.get('/api/external/one/musics', data)
  },
  // 🎈文章分类
  getCategories () {
    return http.get('/api/admin/categories')
  },
  getCategory (data) {
    return http.get('/api/admin/category', data)
  },
  addCategory (data) {
    return http.post('/api/admin/category', data)
  },
  editCategory (id, data) {
    return http.put('/api/admin/category/' + id, data)
  },
  deleteCategory (id) {
    return http.delete('/api/admin/category/' + id)
  }
}
