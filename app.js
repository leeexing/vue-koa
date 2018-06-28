// koa后台的入口文件
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors') // 跨域
const jwt = require('jsonwebtoken') // 权限验证
const server = require('koa-static')
const {MongoDB, RedisDB} = require('./server/db')
const {JWT_SECRET_KEY, CORS_CONFIG} = require('./server/config')
const checkToken = require('./server/middlewares/checkTokenValid')

// 1、🎈MongoDB初始化、相关模型
MongoDB.init()
const User = require('./server/models/User')
// 1-1、Redis数据库初始化
// const Redis = RedisDB.init()
// Redis.get('name', (err, value) => {
//   // console.log(value)
// })


// 2、注册中间件
app.use(server(__dirname + '/server/static/')) // 静态文件
onerror(app)
app.use(cors(CORS_CONFIG)) // 跨域

// ❗❗❗ 可以好好看看这一部分自己改写的支持跨域的代码逻辑。关键就是设置请求头。参考 webpack.md
// app.use(async (ctx, next) => {
//   if (ctx.method === 'OPTIONS') {
//     console.log(1)
//     ctx.set("Access-Control-Allow-Origin", '*')
//     ctx.set("Access-Control-Allow-Credentials", true)
//     ctx.set("Access-Control-Max-Age", 86400000);
//     ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     ctx.set("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type");
//     ctx.status = 200
//     await next()
//   } else {
//     console.log(2)
//     ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin)
//     ctx.set("Access-Control-Allow-Credentials", true)
//     ctx.set("Access-Control-Max-Age", 86400000);
//     ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     ctx.set("Access-Control-Allow-Headers", "Authorization, X-Requested-With, Content-Type");
//     await next()
//   }
// })

app.use(checkToken) // 权限验证

app.use(require('koa-bodyparser')())
// app.use(require('koa-swagger')(SWAGGER_CONFIG))
app.use(json())
app.use(logger())
app.on('error', (err, next) => {
  console.log(`server error: ${err}`)
})

// 3、🎈websocket
require('./server/ws')

// 4、🎈注册路由
const index = require('./server/routes/index')
app.use(index.routes(), index.allowedMethods())

app.listen(8081, () => {
  console.log(`koa is listening in 8081`)
})

module.exports = app
