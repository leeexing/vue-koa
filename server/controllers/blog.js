/**
 * blog 业务处理
 */
const _ = require('lodash')
const fs = require('fs')
const util = require('util')
const fsExists = util.promisify(fs.exists)
const http = require('http')
const {QINIU_DOMAIN_PREFIX} = require('../conf/instance')
const {upToQiniu, removeTemImage, removeFromQiniu} = require('../util/storage')
const {Article, User, Content, Category} = require('../models')
const mockData = require('../util/mock')
const ResponseHelper = require('../util/responseHelper')
const LoggerHelper = require('../util/loggerHelper')
const dbHelper = require('../dbhelper/UserHelper')

/**
 * 文章管理
 * 
 * @class ArticleManager
 */
class ArticleManager {
  static async addArticle (ctx, next) {
    // 🎈添加文章
    try {
      let userID = ctx.userID
      let articles = mockData.mockArticles().articles
      articles.map(item => (item.userID = userID, item))
      // console.log(articles[0])
      // await Article(articles[0]).save()
      dbHelper.AddArticle(articles)
      LoggerHelper.logResponse('添加新文章')
      ctx.body = ResponseHelper.returnTrueData({data: articles})
    } catch (error) {
      LoggerHelper.logError('Server Error: ' + '保存文章时出错')
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error . ~'})
    }
  }
  static async getArticles (ctx) {
    // 🎈获取所有文章
    try {
      let query = ctx.query
      let skip = query.pageSize*(query.currentPage-1)
      let limit = Number.parseInt(query.pageSize)
      let articles = await Article.find().skip(skip).limit(limit)
      let count = await Article.find().count()
      let data = {
        articles,
        count
      }
      LoggerHelper.logResponse(`数据库获取文章列表[pageNo]:,${query.currentPage}-[limit]:${query.pageSize}`)
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (error) {
      LoggerHelper.logError('Server Error: ' + '获取文章列表')
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error . ~'})
    }
  }
  static async getArticleDetail (ctx) {
    // 🎈获取文章具体内容
    // console.log(ctx.params) // 路由需要时这样 /:param
    // console.log(ctx.req._parsedUrl.query)  // 路由需要是这样 /route?id=12&name=leeing
    let params = ctx.params
    if (params.articleID && /\d+/g.test(params.articleID)) {
      let id = params.articleID
      await Article.update({_id: id}, {$inc: {'meta.visit': 1}})
      let detail = await dbHelper.getArticleDetail(id)
      LoggerHelper.logResponse('获取文章内容详情' + id)
      ctx.body = ResponseHelper.returnTrueData({data: detail})
    } else {
      LoggerHelper.logError('获取文章详情时没有传入id')
      ctx.body = ResponseHelper.returnFalseData({message: '没有传入文章ID'})
    }
  }
  static async postArticleComment (ctx) {
    // 🎈添加文章评论
    let articleID = ctx.params.articleID
    let postData = ctx.request.body
    let user = await User.findOne({username: postData.username})
    let commentData = {
      body: postData.comment,
      author: user.username,
      avatar: user.avatar
    }
    let data = await Article.update({_id: articleID}, {$push: {comments: commentData}})
    ctx.body = ResponseHelper.returnTrueData({message: '评论成功！', data})
  }
  static async editArtical (ctx) {
    // 🎈修改文章
    let postData = ctx.request.body
    let updateData = {
      $set: {
        title: postData.title,
        brife: postData.brife,
        content: postData.content
      }
    }
    let result = await Content.findOne({_id: postData.id})
    console.log(result)
    if (result) {
      await Content.update({_id: postData.id}, updateData)
      ctx.body = ResponseHelper.returnTrueData({message: '文章修改成功'})
    } else {
      ctx.body = ResponseHelper.returnFalseData({message: '文章未找到，请确认'})
    }
  }
}

/**
 * 用户管理
 * 
 * @class UserManager
 */
class UserManager {
  static async getCurrentUser (ctx) {
    // 🎈获取当前登陆用户信息
    let username = ctx.username
    try {
      let user = await User.findOne({username}, {password: 0})
      let obj = {
        name: 'leeing',
        age: 23
      }
      delete obj.age
      console.log(obj)
      console.log('>>>', user)
      ctx.body = ResponseHelper.returnTrueData({data: user})
    } catch (err) {
      LoggerHelper.logError(err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error'})
    }
  }
  static async getUsers (ctx) {
    // 🎈获取用户列表
    try {
      let users = await User.find()
      let data = {
        users
      }
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (error) {
      LoggerHelper.logError('Server Error', error)
      ctx.body = ResponseHelper.returnTrueData({message: 'Server Error', status: 500})
    }
  }
  static async fetchUser (ctx) {
    // 🎈获取具体用户信息
    let userID = ctx.params.userID
    try {
      let user = await User.findOne({_id: userID})
      ctx.body = ResponseHelper.returnTrueData({data: user})
    } catch (err) {
      LoggerHelper.logError(err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error'})
    }
  }
  static async editUser (ctx) {
    // 🎈用户列表；修改用户信息
    let putData = ctx.request.body
    let username = putData.username
    console.log('>>>', putData)
    let user = await User.findOne({username})
    if (user) {
      try {
        Object.keys(putData).forEach(key => {
          user[key] = putData[key]
        })
        await User.update({username}, user)
        ctx.body = ResponseHelper.returnTrueData({message: '用户信息修改成功', data: putData})
      } catch (err) {
        LoggerHelper.logError('修改用户信息：', err)
        ctx.status = 500
        ctx.body = ResponseHelper.returnServerError({})
      }
    } else {
      ctx.body = ResponseHelper.returnFalseData({message: '修改用户不存在'})
    }
  }
  static async deleteUser (ctx) {
    // 🎈删除用户
    try {
      let id = ctx.params.id
      console.log(ctx.params)
      await User.remove({_id: id})
      ctx.body = ResponseHelper.returnTrueData({message: '用户删除成功'})
    } catch (err) {
      LoggerHelper.logError('删除用户信息：', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async uploadAvatarLocal (ctx) {
    // 🎈用户头像上传（保存到本地）
    try {
      let file = ctx.req.file
      console.log(file)
      let user = await User.findOne({_id: ctx.userID})
      let avatarUrl = 'http://localhost:8081/upload/' + file.filename
      if (user.avatar) {
        let path = 'E:/Leeing/vue/vue-koa/server/static/upload/' + user.avatar.split('/').pop()
        let exists = await fsExists(path)
        if (exists) {
          removeTemImage(path)
        }
      }
      await User.update({_id: ctx.userID}, {$set: {avatar: avatarUrl}})
      let data = {
        avatar: avatarUrl
      }
      ctx.body = ResponseHelper.returnTrueData({message: '头像上传🤵', data})
    } catch (error) {
      console.log(error)
    }
  }
  static async uploadAvatarQiniu (ctx) {
    // 🎈用户头像上传（到七牛云）
    try {
      let file = ctx.req.file
      console.log(file)
      // console.log(ctx.userID)
      let username = ctx.username
      let key = 'leeing-' + username + '.' + file.originalname.split('.').pop().toLowerCase()
      let uploadData = await upToQiniu(file.path, key).then(res => {
        LoggerHelper.logResponse(res)
        return res
      }).catch(err => {
        LoggerHelper.logError(err)
      })
      console.log('七牛云>>>', uploadData)
      // if (!uploadData.hash) {
      //   await removeFromQiniu(key).then(res => {
      //     console.log(res)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      //   uploadData = await upToQiniu(file.path, key).then(res => {
      //     LoggerHelper.logResponse(res)
      //     return res
      //   }).catch(err => {
      //     LoggerHelper.logError(err)
      //   })
      // }
      removeTemImage(file.path)
      if (uploadData.key) {
        let data = {
          avatarHashUrl: QINIU_DOMAIN_PREFIX + uploadData.hash,
          avatarKeyUrl: QINIU_DOMAIN_PREFIX + uploadData.key
        }
        console.log(data)
        await User.update({username}, {$set: {avatar: data.avatarKeyUrl}})
        ctx.body = ResponseHelper.returnTrueData({message: '头像上传🤵成功', data})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '用户头像只能修改一次！🤣'})
      }
    } catch (err) {
      LoggerHelper.logError(err)
      console.log(err)
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error', status: 500})
    }
  }
}

module.exports = {
  ArticleManager,
  UserManager,
}
