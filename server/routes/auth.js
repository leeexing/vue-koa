/**
 * created by leeing on 2017/9/1
 */
const router = require('koa-router')()
const api = require('../controllers/api')


router.get('/userlist', api.getUserList) // 获取用户列表信息

router.post('/editUser', api.editUserInfo) // 修改用户信息

router.post('/editArtical', api.editArtical) // 修改文章内容

router.post('/addNewArtical', api.addNewArtical) // 新增文章内容 -- 保存

router.get('/getCategory', api.getCategory) // 获取文章分类

router.get('/searchMusic', api.searchMusic) // 查询音乐

module.exports = router
