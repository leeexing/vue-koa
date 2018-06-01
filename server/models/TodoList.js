/**
 * todolist 模型
 */
const mongoose = require('mongoose')
const TodoListSchema = require('../schemas/Todolist')

module.exports = mongoose.model('Todolist', TodoListSchema)
