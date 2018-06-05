/**
 * 后台业务逻辑
*/
const {Category} = require('../models')
const LogHelper = require('../util/loggerHelper')
const ResponseHelper = require('../util/responseHelper')

class CategoryManager {
  static async index (ctx, next) {
    ctx.body = '欢迎来到 vue-koa-Admin'
  }
  static async getCategories (ctx, next) {
    try {
      let ret = await Category.find()
      ctx.body = ResponseHelper.returnTrueData({data: ret})
    } catch (err) {
      LogHelper.logError('获取分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async getCategory (ctx, next) {
    try {
      let query = ctx.query
      console.log(query)
      if (query) {
        let reg = new RegExp(query.name, 'i')
        let ret = await Category.find({name: reg})
        ctx.body = ResponseHelper.returnTrueData({data: ret})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误'})
      }
    } catch (err) {
      LogHelper.logError('获取分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async addCategory (ctx, next) {
    try {
      let body = ctx.request.body
      console.log(body)
      if (body) {
        let category = await Category.findOne({name: body.name})
        if (!category) {
          let ret = await new Category(body).save()
          ctx.body = ResponseHelper.returnTrueData({message: '分类添加成功', data: ret})
        } else {
          ctx.body = ResponseHelper.returnFalseData({message: '分类名称已经存在🈵'})
        }
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误❌'})
      }
    } catch (err) {
      LogHelper.logError('添加分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async editCategory (ctx, next) {
    try {
      let id = ctx.params.id
      if (id) {
        let body = ctx.request.body
        let category = await Category.findOne({_id: id})
        Object.assign(category, body)
        await Category.update({_id: id}, category)
        ctx.body = ResponseHelper.returnTrueData({data: category})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误❌'})
      }
    } catch (err) {
      LogHelper.logError('修改分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async deleteCategory (ctx, next) {
    try {
      let id = ctx.params.id
      if (id) {
        let body = ctx.request.body
        await Category.remove({_id: id})
        ctx.body = ResponseHelper.returnTrueData({message: '删除成功✔'})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误❌'})
      }
    } catch (err) {
      LogHelper.logError('删除分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
}

module.exports = {
  CategoryManager
}
