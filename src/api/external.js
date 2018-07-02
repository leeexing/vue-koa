/**
 * 代理接口数据获取
 */
import http from '@/util/http'
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:7013', // 即使是localhost也需要 `http` 开头的
  timeout: 5000
})

export default {
  getMusic (data = {}) {
    return http.get('/api/external/one/musics', data)
  },
  getProxyUser (data = {}) {
    return service.post('/proxy/user', data)
  }
}
