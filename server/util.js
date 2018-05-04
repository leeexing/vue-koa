/**
 * 接口返回帮助类
 */
class ResponseHelper {
  static returnTrueData({msg='', status=200, data=null}) {
    return {
      success: true,
      msg,
      status,
      data
    }
  }
  static returnFalseData({msg='', status=200, data=null}) {
    return {
      success: false,
      msg,
      status,
      data
    }
  }
}

module.exports = {
  ResponseHelper
}
