/**
 * 主路由
 */
const router = require('koa-router')()
const api = require('koa-router')()

// index.html
api.get('/', async (ctx, next) => {
  ctx.body = 'Hello World. First Page ~'
})

const admin = require('./admin')
const user = require('./user')
const auth = require('./auth')

api.use('/myadmin', admin.routes(), admin.allowedMethods())
api.use('/auth', auth.routes(), auth.allowedMethods())
api.use('/blog', blog.routes(), blog.allowedMethods())

router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
