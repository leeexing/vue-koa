/**
 * 老式写法。将一大堆逻辑控制写在一起，没有很好的分离开来
 */
const router = require('koa-router')()
const fs = require('fs')
const {markdown} = require('markdown')

// 数据表结构
const User = require('../models/User')
const Content = require('../models/Content')

// 统一一个数据格式
let responseData = {
  success: false,
  message: ''
}

// 后台登录首页
router.get('/', async (ctx, next) => {
  ctx.body = '后台管理首页，你 get 到了'
})

// ❌❌❌❌登录。这里的逻辑不用了 
router.post('/login', async (ctx, next) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  let hasUser = await User.findOne({
    username
  })
  console.log(hasUser)
  if (hasUser) {
    let result = await User.findOne({
      username,
      password
    })
    if (result) {
      responseData.success = true
      responseData.message = '用户登录成功'
      responseData.userInfo = {
        id: result._id,
        username: escape(result.username)
      }
      ctx.cookies.set('userInfo', JSON.stringify(responseData.userInfo))
      ctx.body = responseData
    } else {
      responseData.success = false
      responseData.message = '用户名密码错误!'
      ctx.body = responseData
    }
  } else {
    responseData.success = false
    responseData.message = '用户名不存在，请先注册！'
    ctx.body = responseData
  }
})

// 获取文章列表详情
router.get('/topic', async (ctx, next) => {
  let result = await Content.find().sort({_id: -1})
  if (result) {
    ctx.body = {
      success: true,
      message: result
    }
  } else {
    ctx.body = {
      success: false,
      message: '没有数据'
    }
  }
})

// 获取markdown的内容
router.get('/markdown', async (ctx, next) => {
  let getMarkdown = function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./README.md', 'utf8', (error, data) => {
        if (error) {
          return reject(error)
        }
        return resolve(markdown.toHTML(data))
      })
    })
  }
  ctx.body = await getMarkdown()
})

// 通过fs读取index.html文件渲染到页面
router.get('/index', async (ctx, next) => {
  let getHtml = function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          return reject(err)
        }
        console.log(data.toString())
        return resolve(data.toString())
      })
    })
  }
  ctx.body = await getHtml()
})

module.exports = router
