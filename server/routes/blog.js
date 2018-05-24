/**
 * created by leeing on 2017/9/1
 */
const router = require('koa-router')()
const blog = require('../controllers/blog')

router.post('/article', blog.addArticle) // 添加文章

router.get('/articles', blog.getArticles) // 获取文章列表

router.get('/article/:articleID', blog.getArticleDetail) // 获取文章内容详情

router.get('/userlist', blog.getUserList) // 获取用户列表信息

router.post('/editUser', blog.editUserInfo) // 修改用户信息

router.post('/editArtical', blog.editArtical) // 修改文章内容

router.post('/addNewArtical', blog.addNewArtical) // 新增文章内容 -- 保存

router.get('/getCategory', blog.getCategory) // 获取文章分类

router.get('/searchMusic', blog.searchMusic) // 查询音乐

module.exports = router
