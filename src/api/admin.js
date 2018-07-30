/**
 * 后台相关接口
 */
import http from '@/util/http'

export default {
  getUsers (data) {
    return http.get('/api/blog/users', data)
  },
  getUser (id) {
    return http.get('/api/blog/user/' + id)
  },
  deleteUser (id) {
    return http.delete('/api/blog/user/' + id)
  },
  resetPassword (userID) {
    return http.put('/api/auth/resetPassword/' + userID)
  },
  // ===== 分割线 ========
  getMusics (data = {}) {
    return http.get('/api/external/one/musics', data)
  },
  // 🎈文章分类
  getCategories () {
    return http.get('/api/admin/categories')
  },
  getCategory (id, data) {
    return http.get('/api/admin/category/' + id, data)
  },
  addCategory (data) {
    return http.post('/api/admin/category', data)
  },
  editCategory (id, data) {
    return http.put('/api/admin/category/' + id, data)
  },
  deleteCategory (id) {
    return http.delete('/api/admin/category/' + id)
  },
  // 修改文章
  editArticle (id, data) {
    return http.put('/api/blog/article/' + id, data)
  },
  // 用户菜单, 控制菜单的具体权限
  fetchPermissions (data) {
    return http.get('/api/blog/menus', data)
  },
  fetchPermission (id, data) {
    return http.get('/api/blog/menu/' + id, data)
  }
}
