/**
 * todolist 表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodolistSchema = new Schema({
  // 用户的id。建立表关联
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  remindTime: {
    type: String,
    default: ''
  },
  finished: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = TodolistSchema
