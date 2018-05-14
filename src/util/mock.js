import Mock from 'mockjs'

export default Mock.mock({
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


// export default Mock.mock('/admin/topiclist', 'get', {
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
