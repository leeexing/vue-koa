/**
 * 私有变量
*/
QINIU_DOMAIN_PREFIX = 'http://p7f6fz0hn.bkt.clouddn.com/' // python 存储空间
QINIU_ACCESS_KEY = 'q6QLur7zYpyj9rUAeUwkKA3g2Bxi'         // qiniu 安全密钥【已删除部分信息，使用时或报错，如需使用请自行注册】
QINIU_SECRET_KEY = 'l8AfWuWW4DfK1TrZyPzUsXc8WKa_'
QINIU_BUCKET_NAME = 'python'                              // qiniu 上传空间名

module.exports = {
  QINIU_ACCESS_KEY,
  QINIU_BUCKET_NAME,
  QINIU_DOMAIN_PREFIX,
  QINIU_SECRET_KEY,
}
