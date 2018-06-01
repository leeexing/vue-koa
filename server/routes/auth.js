/**
 * created by leeing on 2017/8/23
 */
const authRouter = require('koa-router')()
const AuthManager = require('../controllers/auth')

authRouter.post('/login', AuthManager.login) // 提交用户登录信息的接口
authRouter.post('/logout', AuthManager.logout) // 用户退出接口
authRouter.post('/register', AuthManager.register) // 用户注册信息的接口

module.exports = authRouter
