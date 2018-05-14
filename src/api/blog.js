/**
 * 博客相关接口
 */
import http from '@/util/http'

export default {
  register (data) {
    return http.post('/auth/register', data)
  }
}
