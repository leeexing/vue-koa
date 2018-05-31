/**
 * 日志输出
 * [参考](https://www.cnblogs.com/smartsensor/p/7838169.html)
 */
const log4js = require('log4js')
const {LOGGER_CONFIG} = require('../config')

log4js.configure(LOGGER_CONFIG)

let resLogger = log4js.getLogger('resLogger')
let errorLogger = log4js.getLogger('errorLogger')
let consoleLogger = log4js.getLogger()

class LogUtil {
  static logError (err) {
    errorLogger.error(err)
  }
  static logResponse (info) {
    resLogger.info(info)
  }
  static logInfo (info) {
    consoleLogger.info(info)
  }
}

module.exports = LogUtil