const router = require('koa-router')()

const ExternalManager = require('../controllers/external')

/**
 * 音乐【调用外部接口】
*/
router.get('/one/musics', ExternalManager.searchMusic) // 查询音乐

module.exports = router
