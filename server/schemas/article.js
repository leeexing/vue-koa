/**
 * 文章表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  author: String,
  brief: String,
  body: String,
  comments: [{commontator: String, body: String, date: Date}],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
})

module.exports = ArticleSchema