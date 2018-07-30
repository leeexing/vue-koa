/**
 * 安全配置信息
 */
const baseConfig = require('./conf/baseConfig')
const logConfig = require('./conf/logConfig')
const JWT_SECRET_KEY = 'vue-koa-leeing-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
const JWT_TOKEN_VALID_DATE = '1d'           // 过期时间
const JWT_ISSUER = 'http://localhost:7012'  // 签发者
const JWT_AUDIENCE = 'bloger'               // 接收者
const MONGO_URI = 'mongodb://localhost:27017/myblog'
const BASE_URI = 'http://localhost:8081'

module.exports = {
  JWT_SECRET_KEY,
  JWT_TOKEN_VALID_DATE,
  JWT_ISSUER,
  JWT_AUDIENCE,
  MONGO_URI,
  BASE_URI,
  ...baseConfig,
  ...logConfig,
}
