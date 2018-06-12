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
  // 用户头像上传
  uploadAvatar (data) {
    return http.post(`/api/blog/user/avatar`, data)
  },
  // 获取当前用户信息
  getCurrentUserInfo (data) {
    return http.get('/api/blog/user', data)
  },
  // 修改用户信息
  putUserInfo (data) {
    return http.put('/api/blog/user', data)
  }
}
