/**
 * 日志配置文件
 */
const path = require('path')
// 日志根目录
const baseLogPath = path.resolve(__dirname, '../logs')

// 错误日志目录
const errorPath = '/error'
const errorFileName = 'error'
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName

// 响应日志目录
const responsePath = '/response'
const responseFileName = 'response'
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName

// TODO: 需要更多细节的配置【格式化之类】
const LOGGER_CONFIG = {
  appenders: {
    "rule-console": {"type": "console"},
    "errorLogger": {
        "type": "dateFile",
        "filename": errorLogPath,
        "pattern": "-yyyy-MM-dd-hh.log",
        "alwaysIncludePattern": true,
        "encoding":"utf-8",
        "maxLogSize": 12,
        "numBackups": 3,
        "path":errorPath
    },
    "resLogger": {
        "type": "dateFile",
        "filename": responseLogPath,
        "pattern": "-yyyy-MM-dd-hh.log",
        "alwaysIncludePattern": true,
        "encoding":"utf-8",
        "maxLogSize": 12,
        "numBackups": 3,
        "path":responsePath
    },
  },
  categories: {
    "default": {"appenders": ["rule-console"], "level": "all"},
    "resLogger": {"appenders": ["resLogger"], "level": "info"},
    "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
    "http": {"appenders": ["resLogger"],"level": "info"}
  },
  baseLogPath
}

module.exports = {
  LOGGER_CONFIG,
}
