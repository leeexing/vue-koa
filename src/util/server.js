/**
 * created by leeing on 17/9/5
 * 用于获取one 的图文列表
 */
const basicUrl = 'http://v3.wufazhuce.com:8000'
async function getId (ctx) {
  return new Promise((resolve, reject) => {
    ctx.$http.get(basicUrl + '/api/onelist/idlist')
      .then(ret => {
        resolve(ret.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
function getOneList (ctx, id) {
  let url = basicUrl + `/api/onelist/${id}/0`
  return new Promise((resolve, reject) => {
    ctx.$http.get(url)
      .then(ret => {
        resolve(ret)
      })
      .catch(err => {
        reject(err)
      })
  })
}
async function getAllLists (ctx, ids) {
  let arrs = []
  ids.forEach(item => {
    arrs.push(getOneList(ctx, item))
  })
  return new Promise((resolve, reject) => {
    Promise.all(arrs).then(ret => {
      resolve(ret)
    }).catch(err => {
      reject(err)
    })
  })
}

async function getMusicLists (ctx) {
  return new Promise((resolve, reject) => {
    ctx.$http.get(basicUrl + '/api/channel/music/more/0')
      .then(ret => {
        resolve(ret.data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 获取QQ音乐音乐列表
async function getQQMusic (ctx) {
  return new Promise((resolve, reject) => {
    // ctx.$http.get('/music/101369814.m4a?fromtag=46')
    // ctx.$http.get('/music/musicbox/shop/v3/data/hit/hit_newsong.js')
    ctx.$http.get('https://news-at.zhihu.com/api/4/news/latest')
      .then(ret => {
        resolve(ret)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  getId,
  getOneList,
  getAllLists,
  getMusicLists,
  getQQMusic
}
