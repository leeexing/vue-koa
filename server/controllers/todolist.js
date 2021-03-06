/**
 * todolist 业务逻辑
*/
const {TodoList, User} = require('../models/index')
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
      let todos = await TodoList.find({userID: query.userID})
      // console.log(todos)
      ctx.body = ResponseHelper.returnTrueData({data: todos})
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async addTodo (ctx, next) {
    try {
      let body = ctx.request.body
      console.log(body)
      let todo = await TodoList.findOne({title: body.title})
      if (!todo) {
        let todo = await new TodoList(body).save()
        ctx.body = ResponseHelper.returnTrueData({message: '添加成功~✔', data: todo})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '代办事项已经存在！'})
      }
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async getTodo (ctx, next) {
    /**
     * ✅获取具体待办事项。通过关联查询作者的具体信息 -- 如何去除用户的敏感信息！❓ 使用 select 字段
    */
    try {
      console.log(ctx.request)
      let query = ctx.request.query
      let ret = null
      if (!query.id && !query.title) {
        return ctx.body = ResponseHelper.returnTrueData({data: []})
      }
      if (!!query.id) {
        ret = await TodoList.find({_id: query.id})
        let todoDetail = await TodoList.findOne({_id: query.id}).populate({path: 'userID', select: ['email', 'avatar']})
        // console.log(todoDetail)
        // let todoDetail2 = await TodoList.findOne({_id: query.id}).populate('userID') // 这样也行
      } else if (!!query.title) {
        let reg = new RegExp(query.title, 'i')
        ret = await TodoList.find({title: reg}, {__v: 0})
        // 需要在添加todo的时候配合往user中的todos添加对应的todolist._id.才能获取到数据，否则只会返回用户相关信息和 `一个空的todos`
        // let username = 'koba'
        // let userTodos = await User.findOne({username}).populate({path: 'TodoList'}) 
        // console.log('+++', userTodos)
      }
      let data = {
        todo: ret
      }
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
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
      let todo = await TodoList.findOne({_id: id})
      Object.assign(todo, putData)
      await TodoList.update({_id: id}, todo)
      ctx.body = ResponseHelper.returnTrueData({data: todo})

    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async deleteTodo (ctx, next) {
    /**
     * ✅删除具体待办事项
    */
    try {
      let id = ctx.params.id
      console.log(id)
      await TodoList.remove({_id: id})
      ctx.body = ResponseHelper.returnTrueData({})
    } catch (err) {
      LoggerHelper.logError(`${ctx.path} - Server Error: ${err}`)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
}

module.exports = TodoManager
