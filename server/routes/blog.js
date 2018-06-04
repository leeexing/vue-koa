/**
 * created by leeing on 2017/9/1
 */
const router = require('koa-router')()
const {uploadMulter} = require('../util/storage')
const {ArticleManager, UserManager, MusicManager} = require('../controllers/blog')
const TodoManager = require('../controllers/todolist')
/**
 * 文章
*/
router.post('/article', ArticleManager.addArticle) // 添加文章
router.get('/articles', ArticleManager.getArticles) // 获取文章列表
router.get('/article/:articleID', ArticleManager.getArticleDetail) // 获取文章内容详情
router.put('/article/:articleID', ArticleManager.editArtical) // 修改文章
router.post('/article/:articleID/comment', ArticleManager.postArticleComment) // 添加文章评论

/**
 * 用户
*/
router.get('/user', UserManager.getCurrentUser)     // 获取当前登录用户信息
router.get('/users', UserManager.getUsers)          // 获取用户列表信息
router.get('/user/:userID', UserManager.fetchUser)  // 获取具体用户信息
router.put('/user', UserManager.editUser)   // 修改用户信息
router.post('/user/avatar', uploadMulter.single('file'), UserManager.uploadAvatarLocal) // 用户头像上传(本地)
router.post('/user/avatar/qiniu', uploadMulter.single('file'), UserManager.uploadAvatarQiniu) // 用户头像上传(七牛云)

/**
 * Todolist
*/
router.get('/todos', TodoManager.getTodos)
router.post('/todo', TodoManager.addTodo)
router.get('/todo', TodoManager.getTodo)
router.put('/todo/:id', TodoManager.editTodo)
router.delete('/todo/:id', TodoManager.deleteTodo)

/**
 * 音乐【调用外部接口】
*/
router.get('/searchMusic', MusicManager.searchMusic) // 查询音乐

module.exports = router
