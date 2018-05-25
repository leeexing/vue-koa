/**
 * 用户数据库操作
 */
const User = require('../models/User')
const Article = require('../models/article')
const ObjectID = require('mongodb').ObjectID


const UserSave = async (data) => {
  new User(data).save()
}

const GetUserByName = async (name) => {
  const userInfo = await User.findOne({username: name})
  return userInfo
}

const AddArticle = async (data) => {
  if (Array.isArray(data)) {
    data.forEach(item => {
      new Article(item).save()
    })
  } else {
    new Article(data).save()
  }
}

const getArticleDetail = async (articleID) => {
  // let data = await Article.findById({_id: ObjectID(articleID)})
  let data = await Article.findOne({_id: articleID})
  return data
}

module.exports = {
  UserSave,
  GetUserByName,
  AddArticle,
  getArticleDetail,
}
