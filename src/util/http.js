/**
 * 封装http请求
 */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import { getToken } from '@/util/auth'
import router from '../router'
// import {baseURL} from './config'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8081',
  // baseURL: process.env.BASE_API, // api的base_url.在config/dev.env.js
  withCredentials: true,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
  let userTicket = getToken()
  if (userTicket) {
    config.headers.Authorization = `Bearer ${getToken()}`
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
        console.log('%c ❗❗❗ 通过服务器进行权限限制 ', 'background:#f90;color:#555')
        // 也可以通过window.location.href='/login'; 区别是什么呢？vuex 里面的状态可以清除
        router.push('/login')
        return Promise.reject(error.response)
      case 500:
        router.push({name: 'serverError', params: {errorMessage: error}})
        Message.error('Server Error')
        return Promise.reject(error.response)
      default:
        break
    }
  } else {
    Message.error('Server Error')
    router.push('/login')
  }
})

export default {
  get (url, data = {}, options = {}) {
    let config = {
      params: data,
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
    let config = {
      headers: {
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
    } else {
      data = JSON.stringify(data)
    }
    let config = {
      headers: {
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
      data,
      headers: {
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
