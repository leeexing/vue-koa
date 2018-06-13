/**
 * 接口返回帮助类
 */
class ResponseHelper {
  static returnTrueData({message='success ✅', status=200, data=null} = {}) {
    return {
      success: true,
      message,
      status,
      data
    }
  }
  static returnFalseData({message='failure ❎', status=200, data=null} = {}) {
    return {
      success: false,
      message,
      status,
      data
    }
  }
  static returnServerError({message='Server Error ❌', status=500, data=null} = {}) {
    return {
      success: false,
      message,
      status,
      data
    }
  }
}

module.exports = ResponseHelper
