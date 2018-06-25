/**
 * WebSocket
 */
const WebSocket = require('ws')
const mock = require('./util/mock')

// websocket
const wss = new WebSocket.Server({port: 8080})
// 广播
wss.broadcast = data => {
  wss.clients.forEach(client => {
    client.send(data)
  })
}
// 接收消息
wss.on('connection', ws => {
  console.log('[SERVER]: reveive connection!')
  ws.on('message', msg => {
    console.log(`[SERVER] Received: ${msg}`);
    if (msg === 'Hello The Avengers') {
      return
    }
    let n = Math.ceil(Math.random() * 3)
    let help = mock.mockMessage()
    // console.log(help)
    setTimeout(() => {
      ws.send(help.msgs[Math.ceil(Math.random()*18)])
    }, n*1000)
  })
  ws.send('我是传奇...🐱‍👤')
})
