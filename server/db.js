/**
 * 数据库连接
 */
const {MONGO_URI} = require('./conf')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
mongoose.Promise = global.Promise
Grid.mongo = mongoose.mongo
const redis = require('redis')

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

class RedisDB {
  static init() {
    return redis.createClient(6379, 'localhost')
  }
}


module.exports = {
  MongoDB,
  GridFs,
  RedisDB,
}
