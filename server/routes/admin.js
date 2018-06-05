/**
 * admin
 */
const adminRouter = require('koa-router')()
const {CategoryManager} = require('../controllers/admin')

/**
 * 文章分类
*/
adminRouter.get('/categories', CategoryManager.getCategories)
adminRouter.get('/category', CategoryManager.getCategory)
adminRouter.post('/category', CategoryManager.addCategory)
adminRouter.put('/category/:id', CategoryManager.editCategory)
adminRouter.delete('/category/:id', CategoryManager.deleteCategory)

module.exports = adminRouter
