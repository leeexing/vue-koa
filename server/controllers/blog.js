/**
 * blog 业务处理
 */
const fs = require('fs')
const ObjectID = require('mongodb').ObjectID
const User = require('../models/User')
const Article = require('../models/article');
const Content = require('../models/Content')
const Category = require('../models/Category')
const _ = require('lodash')
const http = require('http')
// const util = require('../util')
const mockData = require('../util/mock')
const ResponseHelper = require('../util/responseHelper')
const Logger = require('../util/loggerHelper')
const dbHelper = require('../dbhelper/UserHelper')

/**
 * 文章管理
 * 
 * @class ArticleManager
 */
class ArticleManager {
  // 🎈添加文章
  static async addArticle (ctx, next) {
    try {
      let userID = ctx.userID
      let articles = mockData.mockArticles().articles
      articles.map(item => (item.userID = userID, item))
      // console.log(articles[0])
      // await Article(articles[0]).save()
      dbHelper.AddArticle(articles)
      Logger.logResponse('添加新文章')
      ctx.body = ResponseHelper.returnTrueData({data: articles})
    } catch (error) {
      Logger.logError('Server Error: ' + '保存文章时出错')
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error . ~'})
    }
  }
  // 🎈获取所有文章
  static async getArticles (ctx) {
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
      Logger.logResponse(`数据库获取文章列表[pageNo]:,${query.currentPage}-[limit]:${query.pageSize}`)
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (error) {
      Logger.logError('Server Error: ' + '获取文章列表')
      ctx.status = 500
      ctx.body = ResponseHelper.returnFalseData({message: 'Server Error . ~'})
    }
  }
  // 🎈获取文章具体内容
  static async getArticleDetail (ctx) {
    // console.log(ctx.params) // 路由需要时这样 /:param
    // console.log(ctx.req._parsedUrl.query)  // 路由需要是这样 /route?id=12&name=leeing
    let params = ctx.params
    if (params.articleID && /\d+/g.test(params.articleID)) {
      let id = params.articleID
      let detail = await dbHelper.getArticleDetail(id)
      Logger.logResponse('获取文章内容详情' + id)
      ctx.body = ResponseHelper.returnTrueData({data: detail})
    } else {
      Logger.logError('获取文章详情时没有传入id')
      ctx.body = ResponseHelper.returnFalseData({message: '没有传入文章ID'})
    }
  }
  // 🎈添加文章评论
  static async postArticleComment (ctx) {
    let articleID = ctx.params.articleID
    let postData = ctx.request.body
    let user = await User.findOne({username: postData.username})
    let commentData = {
      body: postData.comment,
      commontator: user.username,
      c_avatar: user.avatar
    }
    let data = await Article.update({_id: articleID}, {$push: {comments: commentData}})
    ctx.body = ResponseHelper.returnTrueData({message: '评论成功！', data})
  }
  // 🎈修改文章
  static async editArtical (ctx) {
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
  // 🎈获取用户列表
  static async getUsers (ctx) {
    try {
      let users = await User.find()
      let data = {
        users
      }
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (error) {
      Logger.logError('Server Error', error)
      ctx.body = ResponseHelper.returnTrueData({message: 'Server Error', status: 500})
    }
  }
  // 🎈用户列表；修改用户信息
  static async editUser (ctx) {
    let postData = ctx.request.body
    let result = await User.findOne({username: postData.username})
    if (result) {
      if (_.isEqual(result.password, postData.password)) {
        if (!_.isEqual(postData.isAdmin, result.isAdmin)) {
          await User.update({_id: postData.id}, {isAdmin: postData.isAdmin})
          ctx.body = {
            success: true,
            message: '管理员属性变更，修改成功！'
          }
        } else {
          ctx.body = {
            success: true,
            message: '密码没有改动，修改成功！'
          }
        }
      } else {
        await User.update({_id: postData.id}, {password: postData.password})
        ctx.body = {
          success: true,
          message: '密码修改成功！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        message: '修改用户不存在'
      }
    }
  }
  // 用户头像上传
  static async uploadAvatar (ctx) {
    let file = ctx.req.file
    console.log(file)
    fs.unlink(file.path, err => { if (err) console.log(err) })
    let data = ctx.request.body
    console.log(data)
    ctx.body = ResponseHelper.returnTrueData({message: '头像上传🤵'})
  }
}

/**
 * 音乐管理
 * 
 * @class MusicManager
 */
class MusicManager {
  static async searchMusic (ctx) {
    let queryData = ctx.query
    console.log(queryData)
    let num = queryData.num
    let name = queryData.name
    let data = await getMusic(num, name)
    ctx.body = {
      success: true,
      message: data
    }
  }
}
function getMusic (n, keywords) {
  return new Promise((resolve, reject) => {
    let results = ''
    let url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=' + n + '&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=' + keywords)
    console.log(url)
    http.get(url, res => {
      res.on('data', data => {
        results += data
      })
      res.on('end', () => {
        resolve(JSON.parse(results))
      })
      res.on('error', err => {
        reject(err)
      })
    })
  })
}

module.exports = {
  ArticleManager,
  UserManager,
  MusicManager,
}
