/**
 * 相册权限
 */
const monogoose = require('mongoose')

const AlbumPermissionsSchema = new monogoose.Schema({
  pNo: String, // 相册权限编号
  pName: String, // 相册权限名称
  desctiption: String // 相册权限描述
})

const Album = monogoose.model('Album', AlbumPermissionsSchema)

export default Album
