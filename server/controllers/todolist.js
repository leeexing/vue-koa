const Todolist = require('../models/TodoList')

async function saveList (content) {
  await new Todolist(content).save()
}

module.exports = {
  saveList
}
