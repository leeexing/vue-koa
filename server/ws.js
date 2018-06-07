/**
 * ws
 */
const WebSocket = require('ws')
const mock = require('./util/mock')

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
    let help = mock.mockMessage()
    console.log(help)
    setTimeout(() => {
      ws.send(help.msgs[Math.ceil(Math.random()*18)])
    }, n*1000)
  })

  ws.send('您好，拯救者，我需要你的帮忙')
})
