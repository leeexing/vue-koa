/**
 * 数据库连接
 */
const {MONGO_URI} = require('./config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, {useMongoClient: true})
