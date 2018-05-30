/**
 * 文章表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  author: String,
  brief: String,
  body: String,
  comments: [
    {
      body: String,
      author: String,
      avatar: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  meta: {
    visit: Number,
    votes: Number,
    favs: Number
  }
})

module.exports = ArticleSchema