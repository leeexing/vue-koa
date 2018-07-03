/**
 * 用户菜单
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  name: String,
  userType: {
    type: Array,
    default: [4]
  }, // 不能这样 [{type: String, default: 4}] 进行默认设置
  order: {
    type: Number,
    default: 1
  },
  url: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  modifyTime: {
    type: Date,
    default: Date.now
  }
})

const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu
