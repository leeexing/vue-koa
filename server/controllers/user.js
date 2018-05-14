/**
 * 用户业务
 */
const {SECRET_KEY} = require('../config')
const dbHelper = require('../dbhelper/UserHelper')
const {ResponseHelper} = require('../util')
const User = require('../models/User')
// const jwt = require('koa-jwt') // 引入koa-jwt. koa2中使用方法不同了
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// 获取用户信息
async function getUserInfo (ctx, next) {
  let name = ctx.params.id
  console.log(name)
  let result = await dbHelper.GetUserByName(id)
  ctx.body = result
}

// 用户登录校验
async function postUserAuth (ctx, next) {
  let data = ctx.request.body // post过来的数据存在request.body里面
  let userInfo = await dbHelper.GetUserByName(data.username)
  // console.log(data)
  // console.log(userInfo)
  if (userInfo !== null) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) { // 第一个参数必须是用户输入的数据
      ctx.body = ResponseHelper.returnFalseData({message:'密码错误！'})
    } else {
      let userToken = {
        name: userInfo.username,
        isAdmin: userInfo.isAdmin,
        id: userInfo._id
      }
      let token = jwt.sign(userToken, SECRET_KEY, {expiresIn: '1h'}) // 签发 token
      console.log('权限签发--',token)
      ctx.cookies.set('userInfo', JSON.stringify(userToken)) // 保存用户登录信息
      let data = {
        token: userToken // 返回token
      }
      ctx.body = ResponseHelper.returnTrueData({message: '用户登录成功！', data})
    }
  } else {
    ctx.body = ResponseHelper.returnFalseData({message:'用户不存在'})
  }
}

// 用户注册，并保存数据
async function registerUser (ctx, next) {
  let data = ctx.request.body
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(data.password, salt)
  data.password = hash
  console.log(data.password)
  let userInfo = await dbHelper.GetUserByName(data.username)
  if (userInfo === null) {
    await dbHelper.UserSave(data)
    ctx.body = ResponseHelper.returnTrueData({message: '恭喜你，用户名注册成功！'})
  } else {
    ctx.body = ResponseHelper.returnFalseData({message:'该用户名已注册'})
  }
}

async function logout (ctx, next) {
  ctx.cookies.set('userInfo', null)
  ctx.body = {
    success: true,
    message: '用户退出成功'
  }
}

module.exports = {
  getUserInfo,
  postUserAuth,
  registerUser,
  logout
}
