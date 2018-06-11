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
// FIXME:用户菜单配置。默认情况下应该是要存储到数据库中的。这里先做功能测试
const MENUS = {
  '1': ['todo', 'nsts'],
  '2': ['todo', 'nsts', 'about']
}

module.exports = {
  CORS_CONFIG,
  MENUS
}
