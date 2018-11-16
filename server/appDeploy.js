// koa后台的入口文件
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors') // 跨域
const jwt = require('jsonwebtoken') // 权限验证
const server = require('koa-static')
const {MongoDB, RedisDB} = require('./db')
const {CORS_CONFIG_PRO, PORT} = require('./conf')
const checkToken = require('./middlewares/checkTokenValid')

// 0、app 密钥
app.keys = ['skr', 'diss', 'punchline'] // ctx.cookies.set(key, value, {signed: true}) 的时候必须有设置keys

// 1、🎈MongoDB初始化、相关模型
MongoDB.init()
const User = require('./models/User')
// 1-1、Redis数据库初始化
// const Redis = RedisDB.init()
// Redis.get('name', (err, value) => console.log(value))

// 2、注册中间件
app.use(server(__dirname + '/static/')) // 静态文件
onerror(app)
app.use(cors(CORS_CONFIG_PRO)) // 跨域

app.use(checkToken) // 权限验证
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())
app.on('error', (err, next) => {
  console.log(`server error: ${err}`)
})

// 3、🎈websocket
require('./ws')

// 4、🎈注册路由
const index = require('./routes/index')
app.use(index.routes(), index.allowedMethods())

app.listen(PORT, () => {
  console.log(`koa is listening in ${PORT}`)
})

module.exports = app
