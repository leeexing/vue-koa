/**
 * 用户数据库操作
 */
const User = require('../models/User')

const UserSave = function(data) {
  return new Promise((resolve, reject) => {
    console.log(data)
    new User(data).save(err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  UserSave
}
