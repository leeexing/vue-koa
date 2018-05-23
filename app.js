// koa后台的入口文件
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors') // 跨域
const jwt = require('jsonwebtoken') // 权限验证
const MongoDB = require('./server/db')
const {JWT_SECRET_KEY} = require('./server/config')
const checkToken = require('./server/middlewares/checkTokenValid')

// 🎈MongoDB初始化、相关模型
MongoDB.start()
const User = require('./server/models/User')

// 注册中间件
onerror(app)
app.use(cors({
  origin (ctx) {
    if (ctx.url === '/api/proxy/') {
      return ''
    }
    return 'http://localhost:7012'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// koa-jwt 中间件
// app.use(
//   jwt(
//     {JWT_SECRET_KEY}
//   )
//   .unless({
//     path: [/\/login/]
//   })
// )

// const errorHandle = require('./server/middlewares/errorhandle')
// app.use(errorHandle)

app.use(checkToken)

app.use(async (ctx, next) => {
  ctx.userInfo = {}
  console.log(ctx.cookies.get('leeing_token'))
  if (ctx.cookies.get('userInfo')) {
    ctx.userInfo = JSON.parse(ctx.cookies.get('userInfo'))
    ctx.userInfo.username = unescape(ctx.userInfo.username)
    let userInfo = await User.findById(ctx.userInfo.id)
    ctx.userInfo.isAdmin = !!userInfo.isAdmin
    await next()
  } else {
    await next()
  }
})

app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())
app.on('error', (err, next) => {
  console.log(`server error: ${err}`)
})

// 🎈websocket
require('./server/ws')

// 🎈注册路由
const index = require('./server/routes/index')
app.use(index.routes(), index.allowedMethods())

app.listen(8081, () => {
  console.log(`koa is listening in 8081`)
})

module.exports = app
