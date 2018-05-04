/**
 * todolist 表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodolistSchema = new Schema({
  id: {       // 用户的id
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {  // 内容
    type: Array,
    default: []
  }
})

module.exports = TodolistSchema
