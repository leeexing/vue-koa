/**
 * 照片
 * 包含在相册下面
 */
const monogoose = require('mongoose')

const PhotoSchema = new monogoose.Schema({
  albumNo: { // 所属相册
    type: monogoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  photoName: String,
  photoOriginalName: String,
  photoDescription: {
    type: String,
    default: ''
  },
  photoTags: {
    type: String,
    default: 'common'
  }, // 标签
  photoSite: { // 地点 
    type: String,
    default: null
  },
  cOrderNo: {
    type: Number,
    default: 0
  }, // 排序
  photoUrl: String,
  smallPhotoUrl: {
    type: String, // 缩略图
    default: ''
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
})

const Photo = monogoose.model('Photo', PhotoSchema)

module.exports = Photo
