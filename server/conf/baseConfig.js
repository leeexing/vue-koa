/**
 * 基本配置
 * 🛑针对 app.js 文件
*/
const CORS_CONFIG = {
  origin (ctx) {
    if (ctx.url === '/api/proxy/') {
      return '*'
    }
    return 'http://localhost:7012'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with', 'origin']
}

module.exports = {
  CORS_CONFIG
}
