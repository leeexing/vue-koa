/**
 * 用户 表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  avatar: {         // 头像地址
    type: String,
    default: null
  },
  isAdmin: {        // 是否是管理员
    type: Boolean,
    default: false
  },
  motto: String,
  signature: String, // 签名
  tags: [],
  email: {
    type: String,
    default: ''
  },
  permissions: {    // 权限。
    type: Number,
    default: 1
  },
  follows: [
    {
      followName: String,
      followAvatar: String
    }
  ],
  todos: [{  // 一对多的关系
    type: Schema.Types.ObjectId,
    ref: 'Todolist'
  }]
})

module.exports = UserSchema
