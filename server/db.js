/**
 * 数据库连接
 */
const {MONGO_URI} = require('./config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

class MongoDB {
  static start() {
    mongoose.connect(MONGO_URI, {useMongoClient: true})
  }
}

module.exports = MongoDB
