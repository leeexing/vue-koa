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
