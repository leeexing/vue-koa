var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8013"', // 上线修改为'http://132.232.18.77:8081'
  CLIENT_PORT: 8012 // 客户端的端口号
})
