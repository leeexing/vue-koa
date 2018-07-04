/**
 * created by leeing on 2017/9/1
 */
const router = require('koa-router')()
const {uploadMulter, uploadAlbum} = require('../util/storage')
const {ArticleManager, UserManager, MusicManager, MenuManager, AlbumMananger} = require('../controllers/blog')
const TodoManager = require('../controllers/todolist')
/**
 * 文章
*/
router.post('/article/mock', ArticleManager.addArticleMock) // 添加文章 -- mock数据生成
router.post('/article', ArticleManager.addArticle)   // 添加文章
router.get('/articles', ArticleManager.getArticles)  // 获取文章列表
router.get('/article/:id', ArticleManager.getArticleDetail) // 获取文章内容详情
router.put('/article/:id', ArticleManager.editArtical) // 修改文章
router.post('/article/:id/comment', ArticleManager.postArticleComment) // 添加文章评论

/**
 * 用户
*/
router.get('/user', UserManager.getCurrentUser)     // 获取当前登录用户信息
router.get('/users', UserManager.getUsers)          // 获取用户列表信息
router.get('/user/:userID', UserManager.fetchUser)  // 获取具体用户信息
router.put('/user/:id', UserManager.editUser)       // 修改用户信息
router.delete('/user/:id', UserManager.deleteUser)  // 删除用户信息
router.post('/user/avatar', uploadMulter.single('file'), UserManager.uploadAvatarLocal)       // 用户头像上传(本地)
router.post('/user/avatar/qiniu', uploadMulter.single('file'), UserManager.uploadAvatarQiniu) // 用户头像上传(七牛云)
router.post('/userTag', UserManager.addNewTag)
router.delete('/userTag', UserManager.deleteTag)

/**
 * 菜单
*/
router.get('/menus', MenuManager.fetchMenus)
router.get('/menu', MenuManager.fetchMenu)
router.post('/menu', MenuManager.addMenu)
router.put('/menu/id', MenuManager.editMenu)
router.delete('/menu/id', MenuManager.deleteMenu)

/**
 * Todolist
*/
router.get('/todos', TodoManager.getTodos)
router.post('/todo', TodoManager.addTodo)
router.get('/todo', TodoManager.getTodo)
router.put('/todo/:id', TodoManager.editTodo)
router.delete('/todo/:id', TodoManager.deleteTodo)

/**
 * 相册
*/
router.post('/album/cover', uploadAlbum.single('file'), AlbumMananger.uploadAlbumCover) // 相册封面
router.get('/albums', AlbumMananger.fetcheAlbums) // 相册封面
router.post('/album', AlbumMananger.createAlbum) // 相册封面

module.exports = router
