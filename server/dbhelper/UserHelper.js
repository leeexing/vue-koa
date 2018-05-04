/**
 * 用户数据库操作
 */
const User = require('../models/User')

const UserSave = async function(data) {
  new User(data).save()
}

async function GetUserByName (name) {
  const userInfo = await User.findOne({username: name})
  return userInfo // 返回用户数据
}

module.exports = {
  UserSave,
  GetUserByName
}
