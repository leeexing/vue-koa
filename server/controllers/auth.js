/**
 * 用户业务
 */
const {JWT_SECRET_KEY, JWT_TOKEN_VALID_DATE, JWT_ISSUER, MENUS} = require('../config')
const ResponseHelper = require('../util/responseHelper')
const User = require('../models/User')
// const jwt = require('koa-jwt') // 引入koa-jwt. koa2中使用方法不同了
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class AuthManager {
  static async register (ctx, next) {
    /**
     * 🎈用户注册，并保存数据
     */
    let data = ctx.request.body
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(data.password, salt)
    data.password = hash
    let userInfo = await User.findOne({username: data.username})
    if (userInfo === null) {
      console.log('🆔 数据库保存的密码：', data.password)
      await new User(data).save()
      ctx.body = ResponseHelper.returnTrueData({message: '恭喜你，用户名注册成功！'})
    } else {
      ctx.body = ResponseHelper.returnFalseData({message:'该用户名已注册'})
    }
  }
  static async login (ctx, next) {
    /**
     * 🎈用户登录
    */
    let data = ctx.request.body // post过来的数据存在request.body里面
    let user = await User.findOne({username: data.username})
    // console.log(user)
    if (user !== null) {
      if (!bcrypt.compareSync(data.password, user.password)) { // 第一个参数必须是用户输入的数据
        ctx.body = ResponseHelper.returnFalseData({message:'密码错误！'})
      } else {
        let userInfo = {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          avatarUrl: user.avatar
        }
        let token = jwt.sign(userInfo, JWT_SECRET_KEY, {expiresIn: JWT_TOKEN_VALID_DATE, issuer: JWT_ISSUER}) // 签发 token
        console.log('🔰 权限签发--', token)
        ctx.cookies.set('access_token', token) // ❌❌❌保存用户登录信息.好像没有起作用
        let data = {
          userInfo,
          menu: MENUS[user.permissions],
          access_token: token // 返回token
        }
        ctx.body = ResponseHelper.returnTrueData({message: '用户登录成功！', data})
      }
    } else {
      ctx.body = ResponseHelper.returnFalseData({message:'用户不存在'})
    }
  }
  static async logout (ctx, next) {
    /**
     * 🎈用户退出
     */
    ctx.cookies.set('access_token', null)
    ctx.body = ResponseHelper.returnTrueData({message: '用户退出成功'})
  }
}

module.exports = AuthManager
