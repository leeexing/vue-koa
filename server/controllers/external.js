/**
 * 从外部获取相关数据
 */
const http = require('http')
const ResponseHelper = require('../util/responseHelper')
const LogHelper = require('../util/loggerHelper')

class ExternalMananger {
  static async searchMusic (ctx) {
    try {
      let queryData = ctx.query
      console.log(queryData)
      let num = queryData.num
      let name = queryData.name
      let data = await ExternalMananger.getMusic(num, name)
      ctx.body = ResponseHelper.returnTrueData({data})
    } catch (err) {
      LogHelper.logError('获取Musics', err)
      ctx.status = 500
      ctx.body = ResponseHelper.returnServerError({})
    }
  }
  static async getMusic (n, keywords) {
    return new Promise((resolve, reject) => {
      let results = ''
      let url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=' + n + '&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=' + keywords)
      console.log(url)
      http.get(url, res => {
        res.on('data', data => {
          results += data
        })
        res.on('end', () => {
          resolve(JSON.parse(results))
        })
        res.on('error', err => {
          reject(err)
        })
      })
    })
  }
}

module.exports = ExternalMananger
