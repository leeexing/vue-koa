/**
 * 头像、文件上传
 */
const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const qiniu = require('qiniu')
const {QINIU_DOMAIN_PREFIX, QINIU_ACCESS_KEY
        QINIU_SECRET_KEY, QINIU_BUCKET_NAME} = require('../config')


const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../static/'))
  },
  filename (req, file, cb) {
    console.log('上传头像的文件信息 >>> \n', file)
    let fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
const uploadMulter = multer({storage})

/**
 * 重命名
 * @param {*} fileName 
 */
function rename (fileName) {
  return Math.random().toString(16).substr(2) + '.' + fileName.split('.').pop()
}

/**
 * 删除文件
 * @param {*} path 
 */
function removeTemImage (path) {
  fs.unlink(path, err => {
    if (err) {
      throw err
    }
  })
}

/**
 * 上传到七牛云
 * @param {*} filePath 
 * @param {*} key 
 */
function upToQiniu (filePath, key) {
  const mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)
  const options = {
    scope: QINIU_BUCKET_NAME
  }
  const putPolice = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolice.uploadToken(mac)
  const config = new qiniu.conf.Config()
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z1
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        resolve(respBody)
      }
    })
  })
}

module.exports = {
  uploadMulter,
  upToQiniu,
  removeTemImage,
}
