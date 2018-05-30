/**
 * 数据库连接
 */
const {MONGO_URI} = require('./config')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
mongoose.Promise = global.Promise
Grid.mongo = mongoose.mongo

class MongoDB {
  static init() {
    return mongoose.connect(MONGO_URI, {useMongoClient: true})
  }
}

class GridFs {
  static create_gfs() {
    let gfs = new Grid(MongoDB.init())
    return gfs
  }
}


module.exports = {
  MongoDB,
  GridFs,
}
