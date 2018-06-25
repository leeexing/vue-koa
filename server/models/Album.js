/**
 * 相册
 */
const monogoose = require('mongoose')

const AlbumSchema = new monogoose.Schema({
  albumName: String,
  albumDescription: String,
  albumType: String, // 人物、风景、动物、游记、卡通、生活、其他
  albumPermissions: Number, // 权限
  smallPhotosUrl: String,
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: Schema.Types.ObjectId, // 关联字段 --用户的id
    ref: 'User'
  }
})

const Album = monogoose.model('Album', AlbumSchema)

export default Album
