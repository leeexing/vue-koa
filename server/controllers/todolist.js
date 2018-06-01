/**
 * todolist 业务逻辑
*/
const {Todolist} = require('../models/index')
const ResponseHelper = require('../util/responseHelper')
const LogHelper = require('../util/loggerHelper')

/**
 * 待办事项管理类
 * 
 * @class TodoManager
 */
class TodoManager {
  static async getTodos (ctx, next) {
    /**
     * ✅获取所有待办事项
    */
    try {
      let query = ctx.request.query
      console.log(query)
      let todos = await Todolist.find({userID: query.userID})
      console.log(todos)
      ctx.body = ResponseHelper.returnTrueData({data: todos})
    } catch (err) {
      LogHelper.logError('获取todolists', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async addTodo (ctx, next) {
    try {
      let body = ctx.request.body
      console.log(body)
      let todo = await Todolist.findOne({title: body.title})
      if (!todo) {
        let todo = await new Todolist(body).save()
        ctx.body = ResponseHelper.returnTrueData({message: '添加成功~✔', data: todo})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '代办事项已经存在！'})
      }
    } catch (err) {
      LogHelper.logError('添加todo', )
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async getTodo (ctx, next) {
    /**
     * ✅获取具体待办事项
    */
    try {
      let id = ctx.params.id
      let todo = await Todolist.findOne({_id: id})
      let user = await Todolist.findOne({_id: id}).populate({path: 'userID'})
      console.log(user)
      let data = {
        todo,
        user
      }
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (err) {
      LogHelper.logError('获取todolist', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async editTodo (ctx, next) {
    /**
     * ✅修改具体待办事项
    */
    try {
      let id = ctx.params.id
      let putData = ctx.request.body
      console.log('>>>', putData)
      let todo = await Todolist.findOne({_id: id})
      Object.assign(todo, putData)
      await Todolist.update({_id: id}, todo)
      ctx.body = ResponseHelper.returnTrueData({data: todo})

    } catch (err) {
      LogHelper.logError('修改todolist', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async deleteTodo (ctx, next) {
    /**
     * ✅删除具体待办事项
    */
    try {
      let id = ctx.params.id
      console.log(id)
      await Todolist.remove({_id: id})
      ctx.body = ResponseHelper.returnTrueData({})
    } catch (err) {
      LogHelper.logError('删除todolist', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
}

module.exports = TodoManager
