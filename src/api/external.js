/**
 * 代理接口数据获取
 */
import http from '@/util/http'

export default {
  getMusic (data = {}) {
    return http.get('/api/external/one/musics', data)
  }
}
