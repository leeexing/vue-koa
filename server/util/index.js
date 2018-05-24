/**
 * 工具
 */
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config')

const getUserInfo = function (ctx) {
  let token = ctx.request.header['authorization'].split(' ')[1]
  let docoded = jwt.decode(token, JWT_SECRET_KEY)
  return docoded
}

module.exports = {
  getUserInfo,
}
