/**
 * 基本配置
 * 🛑针对 app.js 文件
 * 🎨如果涉及到后台直接设置 cookie，那么就不能使用 origin： ‘*’。因为会和 credentials: true 冲突【相见 koa.md】
*/
const CORS_CONFIG = {
  origin (ctx) {
    if(ctx.request.header.origin.includes('vue.leeing.cn')) { // -服务器 nginx
      return 'http://vue.leeing.cn'
    } else if (ctx.request.header.origin.includes('localhost:8210')) { // -本地 nginx
      return 'http://localhost:8210'
    }
    return 'http://localhost:8012'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with', 'origin']
}

const CORS_CONFIG_PRO = {
  ...CORS_CONFIG,
  origin: 'http://vue.leeing.cn'
}

module.exports = {
  CORS_CONFIG,
  CORS_CONFIG_PRO
}
