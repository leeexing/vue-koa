/**
 * 头像、文件上传
 */
const fs = require('fs')
const path = require('path')
const multer = require('koa-multer')
const qiniu = require('qiniu')
const {QINIU_DOMAIN_PREFIX, QINIU_ACCESS_KEY,
        QINIU_SECRET_KEY, QINIU_BUCKET_NAME} = require('../config/instance')


const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../static/upload/'))
  },
  filename (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname.split('.').pop().toLowerCase())
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
 * @param {*文件本地路径} path 
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
 * @param {*本地文件路径} filePath 
 * @param {*上传到七牛云文件名} key 
 */
function upToQiniu (filePath, key) {
  let mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)
  let options = {
    scope: QINIU_BUCKET_NAME
  }
  let putPolice = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolice.uploadToken(mac)
  // 空间对应的机房
  let config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0
  let localFile = filePath
  let formUploader = new qiniu.form_up.FormUploader(config)
  let putExtra = new qiniu.form_up.PutExtra()
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

function removeFromQiniu (key, bucket=QINIU_BUCKET_NAME) {
  // 资源管理相关的操作首先要构建BucketManager对象
  let mac = new qiniu.auth.digest.Mac(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)
  let config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0
  let bucketManager = new qiniu.rs.BucketManager(mac, config)

  return new Promise((resolve, reject) => {
    bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
      if (err) {
        reject(err)
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
  removeFromQiniu,
}
