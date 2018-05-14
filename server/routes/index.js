/**
 * 主路由
 */
const router = require('koa-router')()

// index.html
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World. First Page ~'
})

const admin = require('./admin')
const user = require('./user')
const api = require('./api')

router.use('/myadmin', admin.routes(), admin.allowedMethods())
router.use('/auth', user.routes(), user.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
