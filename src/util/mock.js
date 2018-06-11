/**
 * mock 数据
 * 1. 已经变为历史，不再使用
 * 2. 保留的意义在于，理解如何简单的使用，以及知晓mock可以模拟接口进行获取
 */
import Mock from 'mockjs'

// export Mock.mock({
//   'topics|32': [
//     {
//       'title': '@ctitle(10, 20)' + ' - ' + '@increment',
//       'name': '@name',
//       'visit|1-500': 100,
//       'time': '@now',
//       'content': '@cparagraph(10, 20)'
//     }
//   ]
// })

export default Mock.mock('/mock/blog/articles', 'get', {
  'topics|32': [
    {
      'title': '@ctitle(10, 20)' + ' - ' + '@increment',
      'name': '@name',
      'visit|1-500': 100,
      'time': '@now',
      'content': '@cparagraph(10, 20)'
    }
  ]
})
