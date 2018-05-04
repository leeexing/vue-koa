/**
 * 用户业务
 */
const {SECRET_KEY} = require('../config')
const dbHelper = require('../dbhelper/UserHelper')
console.log(dbHelper)
const User = require('../models/User')
// const jwt = require('koa-jwt') // 引入koa-jwt. koa2中使用方法不同了
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function getUserById (name) {
  const userInfo = await User.findOne({username: name})
  return userInfo // 返回用户数据
}

// 获取用户信息
async function getUserInfo (ctx, next) {
  let id = ctx.params.id
  console.log(id)
  let result = await getUserById(id)
  ctx.body = result
}

// 用户登录校验
async function postUserAuth (ctx, next) {
  let data = ctx.request.body // post过来的数据存在request.body里面
  let userInfo = await getUserById(data.username)
  // console.log(data)
  // console.log(userInfo)
  if (userInfo !== null) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) { // 第一个参数必须是用户输入的数据
      ctx.body = {
        success: false,
        message: '密码错误！'
      }
    } else {
      let userToken = {
        name: userInfo.username,
        isAdmin: userInfo.isAdmin,
        id: userInfo._id
      }
      // let secret = 'vue-koa-token' // 指定秘钥；合适之后用来判断 token 合法性的标识
      // let token = jwt.sign(userToken, secret) // 签发 token
      ctx.cookies.set('userInfo', JSON.stringify(userToken)) // 保存用户登录信息
      ctx.body = {
        success: true,
        message: '用户登录成功!',
        token: userToken // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: '用户不存在'
    }
  }
}

// 用户注册，并保存数据
async function registerUser (ctx, next) {
  let data = ctx.request.body
  console.log(SECRET_KEY)
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(data.password, salt)
  data.password = hash
  console.log(data.password)
  let userInfo = await getUserById(data.username)

  if (userInfo === null) {
    // await new User(data).save() // 用户保存
    dbHelper.UserSave(data).then(res => {
      console.log(res)
      ctx.body = {
        success: true,
        message: '恭喜你，用户名注册成功！'
      }
    }).catch(err => {
      console.log(err)
    })
  } else {
    ctx.body = {
      success: false,
      message: '该用户名已注册'
    }
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
