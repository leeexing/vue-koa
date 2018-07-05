/**
 * 数据库模型主入口
 */
const Article = require('./Article')
const User = require('./User')
const Menu = require('./Menu')
const Content = require('./Content')
const Category = require('./Category')
const TodoList = require('./TodoList')
const Album = require('./Album')
const Photo = require('./Photo')

module.exports = {
  Article,
  User,
  Content,
  Category,
  TodoList,
  Menu,
  Album,
  Photo,
}
