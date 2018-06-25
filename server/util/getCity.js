/**
 * 获取用户所在城市
 */
const http = require('http')
const util = require('util')

const getIpInfo = function (ip, cb) {
  let sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='
  let url = sina_server + ip
  http.get(url, res => {
    if (res.statusCode === 200) {
      res.on('data', data => {
        try {
          cb(null, JSON.parse(data))
        } catch (err) {
          cb(err)
        }
      })
    }
  }).on('error', err => cb(err))
}

export default getIpInfo
