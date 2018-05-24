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
 * 🎈添加文章
 * @param {*} ctx 
 */
async function addArticle (ctx, next) {
  try {
    let userID = ctx.userID
    let articles = mockData.mockArticles().articles
    articles.map(item => (item.id = userID, item))
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

/**
 * 🎈获取所有文章
 * @param {*} ctx 
 */
async function getArticles (ctx) {
  try {
    let articles = mockData.mockArticles()
    Logger.logResponse('获取文章列表')
    ctx.body = ResponseHelper.returnTrueData({data: articles})
  } catch (error) {
    Logger.logError('Server Error: ' + '获取文章列表')
    ctx.status = 500
    ctx.body = ResponseHelper.returnFalseData({message: 'Server Error . ~'})
  }
}

async function getArticleDetail (ctx) {
  // console.log(ctx.params) // 路由需要时这样 /:param
  // console.log(ctx.req._parsedUrl.query)  // 路由需要是这样 /route?id=12&name=leeing
  let params = ctx.params
  if (params.articleID && /\d+/g.test(params.articleID)) {
    let id = params.articleID
    let detail = mockData.mockArticle(id)
    Logger.logResponse('获取文章内容详情' + id)
    ctx.body = ResponseHelper.returnTrueData({data: detail})
  } else {
    Logger.logError('获取文章详情时没有传入id')
    ctx.body = ResponseHelper.returnFalseData({message: '没有传入文章ID'})
  }
}

/**
 * 🎈获取用户列表
 * @param {*} ctx 
 */
async function getUserList (ctx) {
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

/**
 * 🎈用户列表；修改用户信息
 * @param {*} ctx 
 */
async function editUserInfo (ctx) {
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

/**
 * 🎈修改文章内容
 * @param {*} ctx 
 */
async function editArtical (ctx) {
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
    ctx.body = {
      success: true,
      message: '内容修改成功'
    }
  } else {
    ctx.body = {
      success: false,
      message: '文章未找到，请确认'
    }
  }
}

/**
 * 🎈增加新的文章 保存
 * @param {*} ctx 
 */
async function addNewArtical (ctx) {
  let postData = ctx.request.body
  let hasUser = await User.findOne({_id: postData.user})
  if (!hasUser) {
    ctx.body = {
      success: false,
      message: '参数错误，用户名不存在'
    }
    return
  }
  await Content(postData).save()
  ctx.body = {
    success: true,
    message: '恭喜你，文章保存成功！'
  }
}

// 获取文章分类
async function getCategory (ctx) {
  try {
    let result = await Category.find()
    let data = {
      category: result
    }
    ctx.body = ResponseHelper.returnTrueData({data})
  } catch (error) {
    console
    ctx.body = ResponseHelper.returnFalseData({message: 'Server Error', status: 500})
  }
}

// 跨域获取音乐数据
async function searchMusic (ctx) {
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
  getUserList,
  editUserInfo,
  editArtical,
  addNewArtical,
  getCategory,
  searchMusic,

  addArticle,
  getArticles,
  getArticleDetail
}
