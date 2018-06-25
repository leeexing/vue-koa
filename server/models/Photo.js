/**
 * 照片
 * 包含在相册下面
 */
const monogoose = require('mongoose')

const PhotoSchema = new monogoose.Schema({
  albumNo: { // 所属相册
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photoName: String,
  photoDescription: String,
  photoTags: String, // 标签
  photoSite: { // 地点 
    type: String,
    default: Null
  },
  cOrderNo: Number, // 排序
  createTime: {
    type: Date,
    default: Date.now
  },
  photoUrl: String,
  smallPhotoUrl: {
    type: String, // 缩略图
    default: ''
  }
})

const Photo = monogoose.model('Photo', PhotoSchema)

export default Photo
