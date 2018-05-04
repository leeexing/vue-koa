const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContentSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId, // 关联字段 --内容分类的id
    ref: 'Category' // 引用
  },
  title: String,
  user: {
    type: Schema.Types.ObjectId, // 关联字段 --用户的id
    ref: 'User'
  },
  addTime: {
    type: Date,
    default: new Date()
  },
  views: {  // 阅读量
    type: Number,
    default: 0
  },
  brife: {  // 简介
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  comments: {
    type: Array,
    default: []
  }
})

const Content = mongoose.model('Content', ContentSchema) // 要想在Schema里面被引用，得需要赋值到一个变量里面

module.exports = Content
