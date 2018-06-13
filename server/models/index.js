/**
 * 数据库模型主入口
 */
const Article = require('./Article')
const User = require('./User')
const Menu = require('./Menu')
const Content = require('./Content')
const Category = require('./Category')
const Todolist = require('./TodoList')

module.exports = {
  Article,
  User,
  Content,
  Category,
  Todolist,
  Menu
}
