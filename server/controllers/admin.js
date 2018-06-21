/**
 * 后台业务逻辑
*/
const {Category, Article} = require('../models')
const LogHelper = require('../util/loggerHelper')
const ResponseHelper = require('../util/responseHelper')

class CategoryManager {
  static async index (ctx, next) {
    ctx.body = '欢迎来到 vue-koa-Admin'
  }
  static async getCategories (ctx, next) {
    try {
      let ret = await Category.find().sort({_id:-1})
      ctx.body = ResponseHelper.returnTrueData({data: ret})
    } catch (err) {
      LogHelper.logError('获取分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async getCategory (ctx, next) {
    try {
      let _id = ctx.params.id
      let name = ctx.query.name
      if (_id) {
        if (_id === -1) {
          if (name) {
            let reg = new RegExp(name, 'i')
            let data = await Category.find({name: reg})
            return ctx.body = ResponseHelper.returnTrueData({data})
          } else {
            ctx.body = ResponseHelper.returnFalseData({message: '参数错误'})
          }
        }
        let data = await Category.findOne({_id})
        ctx.body = ResponseHelper.returnTrueData({data})
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误'})
      }
    } catch (err) {
      LogHelper.logError('获取分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
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
      let _id = ctx.params.id
      if (_id) {
        let body = ctx.request.body
        let category = await Category.findOne({_id})
        if (category) {
          await Article.update({category: {$in: [category.name]}}, {$push: {category: body.name}}, {multi: true})
          await Article.update({category: {$in: [category.name]}}, {$pull: {category: category.name}}, {multi: true})
          Object.assign(category, body)
          await Category.update({_id}, category)
          ctx.body = ResponseHelper.returnTrueData({data: category})
        } else {
          ctx.body = ResponseHelper.returnFalseData({message: '无效的id'})
        }
      } else {
        ctx.body = ResponseHelper.returnFalseData({message: '参数错误❌'})
      }
    } catch (err) {
      LogHelper.logError('修改分类', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError()
    }
  }
  static async deleteCategory (ctx, next) {
    try {
      let _id = ctx.params.id
      if (_id) {
        let category = await Category.findOne({_id})
        console.log(category)
        if (category) {
          await Article.update({category: {$in: [category.name]}}, {$pull: {category: category.name}}, {multi: true})
          await Category.remove({_id})
          ctx.body = ResponseHelper.returnTrueData({message: '删除成功✔'})
        } else {
          ctx.body = ResponseHelper.returnFalseData({message: '无效的id'})
        }
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
