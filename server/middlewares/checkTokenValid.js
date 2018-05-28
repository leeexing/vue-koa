/**
 * 检验token是否有效和过期
 * 【中间件】
 */
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../util/responseHelper')
const {JWT_SECRET_KEY} = require('../config')
const util = require('util')
const verify = util.promisify(jwt.verify) // util 工具，转为 promise
const Logger = require('../util/loggerHelper')


async function validToken (ctx, next) {
  // console.log(ctx.request, '>>>>>', ctx.request.url)
  if (ctx.request.url === '/api/auth/login' || ctx.request.url === '/api/auth/register') {
    await next()
  } else {
    if (ctx.request.header['authorization']) {
      let token = ctx.request.header['authorization'].split(' ')[1]
      console.log(token)
      // let decoded = jwt.decode(token, JWT_SECRET_KEY)
      await verify(token, JWT_SECRET_KEY).then(decoded => {
        if (token && decoded.exp <= new Date() / 1000) {
          ctx.status = 401
          console.log('token 过期了')
          Logger.logResponse('token 过期了' + ' ⚠ ' + token)
          ctx.body = ResponseHelper.returnFalseData({message: 'token 过期了⏰'})
        } else {
          ctx.userID = decoded.id
          return next()
        }
      }).catch(err => {
        console.log('Token Error:', err.message)
        Logger.logError(err.name + ' : ' + err.message)
        ctx.status = 401
        ctx.body = ResponseHelper.returnFalseData({message: '无效token❌'})
      })
    } else {
      Logger.logError('Toekn Error' + ' : ' + 'Token is null')
      ctx.status = 401
      ctx.body = ResponseHelper.returnFalseData({message: '没有token🚫'})
    }
  }
}
module.exports = validToken