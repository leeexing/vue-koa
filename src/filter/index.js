/**
 * vue 全局过滤函数
 */
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * 用于消息提示时间过了多久
 * 【英文版】
 */
function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 时间格式化
 * 【中文版】
 */
function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else if (diff < 3600 * 24 * 7) {
    let day = diff / (3600 * 24)
    return `${Math.floor(day)}天前`
  } else if (diff < 3600 * 24 * 31) {
    let week = diff / (3600 * 24 * 7)
    return `${Math.floor(week)}周前`
  } else if (diff < 3600 * 24 * 365) {
    let month = diff / (3600 * 24 * 30)
    return `${Math.floor(month)}月前`
  } else if (diff < 3600 * 24 * 365 * 10) {
    let year = diff / (3600 * 24 * 365)
    return `${Math.floor(year)}年前`
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * 千分位增加逗号
 */
function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export {
  timeAgo,
  formatTime,
  toThousandslsFilter
}
