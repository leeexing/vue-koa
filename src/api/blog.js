/**
 * 博客相关接口
 */
import http from '@/util/http'

export default {
  register (data) {
    return http.post('/api/auth/register', data)
  },
  login (data) {
    return http.post('/api/auth/login', data)
  },
  logout () {
    return http.post('/api/auth/logout')
  },
  modifyPassword (data) {
    return http.put('/api/auth/modifyPassword', data)
  },
  // 添加文章
  addArticle (data) {
    return http.post('/api/blog/article', data)
  },
  // 添加文章 -- 后台通过mock生成
  addArticleMock (data) {
    return http.post('/api/blog/article/mock', data)
  },
  // 获取文章列表
  getArticleList (data) {
    return http.get('/api/blog/articles', data)
  },
  // 获取文章详情
  getArticleDetail (id) {
    return http.get('/api/blog/article/' + id, {id})
  },
  // 添加文章评论
  postArticleComment (id, data) {
    return http.post(`/api/blog/article/${id}/comment`, data)
  },
  /**
   * 用户设置
   */
  // 用户头像上传
  uploadAvatar (data) {
    return http.post(`/api/blog/user/avatar`, data)
  },
  // 获取当前用户信息
  getCurrentUserInfo (data) {
    return http.get('/api/blog/user', data)
  },
  // 修改用户信息
  putUserInfo (id, data) {
    return http.put('/api/blog/user/' + id, data)
  },
  addNewTag (data) {
    return http.post('/api/blog/userTag', data)
  },
  deleteTag (data) {
    return http.delete('/api/blog/userTag', data)
  },
  /**
   * 菜单
  */
  fetchMenus (data) {
    return http.get('/api/blog/menus', data)
  },
  fetchMenu (data) {
    return http.get('/api/blog/menu', data)
  },
  addNewMenu (data) {
    return http.post('/api/blog/menu', data)
  },
  editMenu (id, data) {
    return http.put('/api/blog/menu/' + id, data)
  },
  deleteMenu (id) {
    return http.put('/api/blog/menu/' + id)
  },
  /**
   * 相册
  */
  createAlbum (data) {
    return http.post('/api/blog/album', data)
  },
  fetchAlbums (data) {
    return http.get('/api/blog/albums', data)
  },
  fetchPhotos (data) {
    return http.get('/api/blog/photo', data)
  }
}
