/**
 * 头像、文件上传
 */
const path = require('path')
const multer = require('koa-multer');
const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../static/'))
  },
  filename (req, file, cb) {
    let fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const upload = multer({storage})

module.exports = upload
