/**
 * ws
 */
const WebSocket = require('ws')
const Mock = require('mockjs') // mock 火星数据

// websocket
const wss = new WebSocket.Server({port: 8080})
wss.on('connection', ws => {
  console.log('server: reveive connection!')
  ws.on('message', msg => {
    console.log(`我接到来自前台的信息： ${msg}`)
    if (msg === 'hello') {
      return
    }
    let n = Math.ceil(Math.random() * 3)
    console.log(n)
    let help = Mock.mock({
      'msgs|3': ['@ctitle(10, 20)', '@name', '@title(10, 20)', '@time', '@sentence', '@email']
    })
    setTimeout(() => {
      ws.send(help.msgs[Math.ceil(Math.random()*18)])
    }, n*1000)
  })

  ws.send('您好，拯救者，我需要你的帮忙')
})
