/**
 * 用户 表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  isAdmin: {        // 是否是管理员
    type: Boolean,
    default: false
  }
})

module.exports = UserSchema
