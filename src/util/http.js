/**
 * 封装http请求
 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { getToken } from '@/util/auth'
import router from '../router'

const service = axios.create({
  baseURL: 'http://localhost:8081', // 即使是localhost也需要 `http` 开头的
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
  let userTicket = getToken()
  if (userTicket === null) {
    window.location.href = '/login'
  }
  return config
}, error => {
  Message.error('请求拦截')
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
  let message = response.data.error || response.data.message
  if (!response.data.success) {
    Message.warning(message)
    return Promise.reject(response.data)
  }
  return response
}, error => {
  console.log(error)
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.log(error.response)
        console.log('%c ❗❗❗ 通过服务器进行权限限制 ', 'background:#f90;color:#555')
        // console.log('通过路由跳转') // 也可以通过window.location.href='/login';区别是什么呢？vuex里面的状态可以清除
        router.push('/login')
        return Promise.reject(error.response)
      case 500:
        router.push({name: 'serverError', params: {errorMessage: error}})
        Message.error('Server Error')
        return Promise.reject(error.response)
      default:
        break
    }
  }
})

export default {
  get (url, data = {}, options = {}) {
    let config = {
      params: data,
      headers: {
        Authorization: getToken() && `Bearer ${getToken()}`
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'brackets'})
      },
      ...options
    }
    return new Promise((resolve, reject) => {
      service.get(url, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
  post (url, data = {}, options = {}) {
    let contentType = 'application/json'
    let authorization = null
    switch (options.contentType) {
      case 'form':
        data = qs.stringify(data)
        contentType = 'application/x-www-form-urlencoded;charset=utf-8'
        break
      case 'file':
        contentType = 'applicationform-data'
        break
      default:
        data = JSON.stringify(data)
        break
    }
    if (url.indexOf('token') < 0 && getToken()) {
      authorization = `Bearer ${getToken()}`
    }
    let config = {
      headers: {
        Authorization: authorization,
        'Content-Type': contentType
      }
    }
    return new Promise((resolve, reject) => {
      service.post(url, data, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
  put (url, data = {}, options = {}) {
    let contentType = 'application/json'
    if (options.contentType === 'form') {
      contentType = 'application/x-www-form-urlencoded;charset=utf-8'
      data = qs.stringify(data)
    }
    data = JSON.stringify(data)
    let config = {
      headers: {
        Authorization: getToken() && `Bearer ${getToken()}`,
        'Content-Type': contentType
      }
    }
    return new Promise((resolve, reject) => {
      service.put(url, data, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  },
  delete (url, data = {}, options = {}) {
    let contentType = 'application/json'
    if (options.contentType === 'form') {
      contentType = 'application/x-www-form-urlencoded;charset=utf-8'
      data = qs.stringify(data)
    }
    let config = {
      data: data,
      headers: {
        Authorization: getToken() && `Bearer ${getToken()}`,
        'Content-Type': contentType
      },
      ...options
    }
    return new Promise((resolve, reject) => {
      service.delete(url, config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }
}
