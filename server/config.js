/**
 * 安全配置信息
 */
JWT_SECRET_KEY = 'vue-koa-leeing-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
JWT_TOKEN_VALID_DATE = '1h'
JWT_ISSUER = 'http://localhost:7012'
JWT_AUDIENCE = 'bloger'
MONGO_URI = 'mongodb://localhost:27017/myblog'

module.exports = {
  JWT_SECRET_KEY,
  JWT_TOKEN_VALID_DATE,
  JWT_ISSUER,
  JWT_AUDIENCE,
  MONGO_URI,
}
