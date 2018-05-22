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
  // 获取文章列表
  getArticleList (data) {
    return http.get('/api/blog/articles', data)
  },
  getArticleDetail (id) {
    return http.get('/api/blog/article/' + id, {id})
  }
}
