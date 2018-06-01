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
const blog = require('./blog')
const auth = require('./auth')

api.use('/auth', auth.routes(), auth.allowedMethods())
api.use('/blog', blog.routes(), blog.allowedMethods())
api.use('/admin', admin.routes(), admin.allowedMethods())

router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
