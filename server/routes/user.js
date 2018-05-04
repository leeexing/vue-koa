/**
 * created by leeing on 2017/8/23
 */
const router = require('koa-router')()
const userAPI = require('../controllers/user')

// 首页
router.get('/', async (ctx, next) => {
  ctx.body = '话题首页-- 获取用户信息'
})

router.get('/:id', userAPI.getUserInfo) // 获取用户信息

router.post('/login', userAPI.postUserAuth) // 提交用户登录信息的接口

router.post('/logout', userAPI.logout) // 用户退出接口

router.post('/register', userAPI.registerUser) // 用户注册信息的接口

module.exports = router
