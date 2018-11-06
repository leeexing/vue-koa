/**
 * 用户业务
 */
const {JWT_SECRET_KEY, JWT_TOKEN_VALID_DATE, JWT_ISSUER} = require('../conf')
const ResponseHelper = require('../util/responseHelper')
const LoggerHelper = require('../util/loggerHelper')
const {User, Menu} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Cookies = require('cookies')

class AuthManager {
  static async register (ctx, next) {
    /**
     * 🔑用户注册，并保存数据
     *  默认 admin开头的用户和 leeing 用户为超级管理员
     */
    try {
      let body = ctx.request.body
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(body.password, salt)
      body.password = hash
      let userInfo = await User.findOne({username: body.username})
      if (userInfo === null) {
        console.log('🆔 数据库保存的密码：', body.password)
        if (body.username.startsWith('admin') || body.username === 'leeing') {
          body.permissions = 4
        } else {
          body.permissions = 1
        }
        await new User(body).save()
        ctx.body = ResponseHelper.returnTrueData({message: '恭喜你，用户名注册成功！'})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message:'该用户名已注册'})
      }
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async login (ctx, next) {
    /**
     * 🔑用户登录
    */
    try {
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
            avatarUrl: user.avatar,
            signature: user.signature
          }
          let menu = await Menu.find({userType: {$in: [user.permissions]}}, {url: 1})
          menu = menu.map(item => item.url)
          let access_token = jwt.sign(userInfo, JWT_SECRET_KEY, {expiresIn: JWT_TOKEN_VALID_DATE, issuer: JWT_ISSUER}) // 签发 access_token
          ctx.cookies.set('access_token', access_token, {path: '/', expires: new Date('2018-11-16')}) // ❌❌❌保存用户登录信息.好像没有起作用
          console.log('🔰 权限签发--', access_token)
          let data = {
            userInfo,
            menu,
            access_token, // 返回token
          }
          ctx.body = ResponseHelper.returnTrueData({message: '用户登录成功！', data})
        }
      } else {
        ctx.body = ResponseHelper.returnFalseData({message:'用户不存在'})
      }
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async logout (ctx, next) {
    /**
     * 🔑用户退出
     */
    console.log('=== ', ctx.cookies.get('access_token', {signed: true}))
    console.log('+++ ', ctx.cookies.get('access_token'))
    // console.log('+++ ', ctx.cookies.get('access_token.sig'))
    // ctx.cookies.set('access_token', null)
    // ctx.cookies.set('access_token', null, {signed: true})
    ctx.body = ResponseHelper.returnTrueData({message: '用户退出成功'})
  }
  static async modifyPassword (ctx) {
    try {
      let body = ctx.request.body
      if (body && body.password && body.newPass) {
        let username = body.username
        let user = await User.findOne({username})
        if (!bcrypt.compareSync(body.password, user.password)) { // 第一个参数必须是用户输入的数据
          return ctx.body = ResponseHelper.returnFalseData({message:'密码错误！'})
        } else {
          let salt = bcrypt.genSaltSync(10)
          let hash = bcrypt.hashSync(body.newPass, salt)
          user.password = hash
          await User.update({username}, user)
          ctx.body = ResponseHelper.returnTrueData()
        }
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误'})
      }
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async resetPassword (ctx) {
    // 重置密码
    try {
      let _id = ctx.params.id
      let user = User.findOne({_id})
      if (user) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync('123456', salt)
        user.password = hash
        console.log(hash)
        await User.update({_id}, user)
        ctx.body = ResponseHelper.returnTrueData({message: '用户密码重置成功'})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '用户不存在'})
      }
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
}

module.exports = AuthManager
