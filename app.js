// koa后台的入口文件
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors') // 跨域
const jwt = require('jsonwebtoken') // 权限验证
const server = require('koa-static')
const {MongoDB} = require('./server/db')
const {JWT_SECRET_KEY, CORS_CONFIG} = require('./server/config')
const checkToken = require('./server/middlewares/checkTokenValid')

// 1、🎈MongoDB初始化、相关模型
MongoDB.init()
const User = require('./server/models/User')

// 2、注册中间件
app.use(server(__dirname + '/server/static/')) // 静态文件
onerror(app)
app.use(cors(CORS_CONFIG))

app.use(checkToken)

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
