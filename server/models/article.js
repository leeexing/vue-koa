/**
 * 文章模型
 */
const mongoose = require('mongoose')
const ArticleShema = require('../schemas/article')

const ArticleModle = mongoose.model('Article', ArticleShema)

module.exports = ArticleModle
