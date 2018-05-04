/**
 * 分类的表结构
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String  // 分类名称
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
