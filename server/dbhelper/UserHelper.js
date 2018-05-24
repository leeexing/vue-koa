/**
 * 用户数据库操作
 */
const User = require('../models/User')
const Article = require('../models/article');


const UserSave = async (data) => {
  new User(data).save()
}

const GetUserByName = async (name) => {
  const userInfo = await User.findOne({username: name})
  return userInfo
}

const AddArticle = async (data) => {
  if (Array.isArray(data)) {
    await data.forEach(item => {
      new Article(item).save()
    })
  } else {
    await new Article(data).save()
  }
}

module.exports = {
  UserSave,
  GetUserByName,
  AddArticle,
}
