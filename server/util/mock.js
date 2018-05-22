/**
 * 模拟数据
 * [参考]（https://segmentfault.com/a/1190000010211622）
 */
const Mock = require('mockjs')
const Random = Mock.Random

/**
 * 模拟文章列表数据
 */
function mockArticles () {
  return Mock.mock({
    'articles|32': [
      {
        'id|+1': 1,
        'title': '@ctitle(10, 20)' + ' - ' + '@increment',
        'name': '@name',
        'visit|1-500': 100,
        'time': '@now',
        'content': '@cparagraph(10, 20)'
      }
    ]
  })
}

function mockArticle (id) {
  return Mock.mock({
    'article': {
      'id': id,
      'title': '@ctitle(10, 20)',
      'author': '@name',
      'visit|1-500': 100,
      'time': '@now',
      'content': '@cparagraph(100, 200)'
    }
  })
}

function mockCategory () {
  return Mock.mock({
    'category|10-20': [
      {
        'id|+1': 1,
        'name': '@name',
        'title': Random.title(5, 10)
      }
    ]
  })
}

module.exports = {
  mockArticles,
  mockArticle,
  mockCategory,
}
