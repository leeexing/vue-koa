/**
 * 检验token是否有效和过期
 * 【中间件】
 */
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../util/responseHelper')
const {JWT_SECRET_KEY} = require('../config')
const util = require('util')
const verify = util.promisify(jwt.verify) // util 工具，转为 promise

async function validToken (ctx, next) {
  console.log(ctx.request.header)
  if (ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'].split(' ')[1]
    // let decoded = jwt.decode(token, JWT_SECRET_KEY)
    await verify(token, JWT_SECRET_KEY).then(decoded => {
      console.log(decoded)
      if (token && decoded.exp <= new Date() / 1000) {
        ctx.status = 401
        console.log('token 过期了')
        ctx.body = ResponseHelper.returnFalseData({message: 'token 过期了😂'})
      } else {
        next()
      }
    }).catch(err => {
      console.log('invalid signature', err)
    })
  } else {
    ctx.status = 401
    ctx.body = ResponseHelper.returnFalseData({message: '没有token😱'})
  }
}
module.exports = validToken