/**
 * 接口返回帮助类
 */
class ResponseHelper {
  static returnTrueData({message='', status=200, data=null}) {
    return {
      success: true,
      message,
      status,
      data
    }
  }
  static returnFalseData({message='', status=200, data=null}) {
    return {
      success: false,
      message,
      status,
      data
    }
  }
}

module.exports = ResponseHelper
