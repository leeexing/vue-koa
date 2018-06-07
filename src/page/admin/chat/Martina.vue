<template>
  <div class="m-chat">
    <section class="warpper">
      <header>
        <h3 @click="show">一想到你，我的丑脸就泛起微笑</h3>
        <dialog ref="dialog">
          <h3>我是来之火星的dialog</h3>
          <p>新的特性你可以尝试：show | close | showModal</p>

          <el-button type="success" @click="closeDialog">有惊喜</el-button>
        </dialog>
      </header>
      <div class="chat-content" ref='msgContent'>
        <div v-for="(item, index) in msgList" :key="item.id">
          <div v-if="index % 3 === 0" class="time">
            <time>{{formatTime(item.time)}}</time>
          </div>
          <div class="chat" :class="{martina: item.from === 'martina', human: item.from === 'human'}">
            <div class="avatar"></div>
            <div class="msg">
              <p>{{item.msg}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        @keyup.enter.native="sendMessage"
        v-model="textarea">
      </el-input>
      <el-button type="primary" round @click="sendMessage">ENTER</el-button>
    </footer>
  </div>
</template>

<script>
import {formatTime} from '@/util'
export default {
  name: 'chat',
  data () {
    return {
      count: 1,
      textarea: '',
      msgList: [
        // {
        //   from: 'martina',
        //   msg: '您好，拯救者，我需要你的帮忙',
        //   time: '2018年1月9日 下午 2:58'
        // }
      ],
      received: true
    }
  },
  mounted () {
    this.ws = new WebSocket('ws://localhost:8080')
    // 第一次连接后台的 wss
    this.ws.onopen = () => {
      this.ws.send('hello')
    }
    // 接收后台火星人发过来的信号
    this.ws.onmessage = martinaMsg => {
      // console.log('ws onmessage')
      // console.log(martinaMsg)
      let from = 'martina'
      let time = this.$moment().format('lll')
      let msg = martinaMsg.data
      this.msgList.push({from, msg, time})
      this.received = true
      this.$nextTick(() => {
        this.scroll()
      })
    }
  },
  methods: {
    sendMessage () {
      let msg = this.textarea
      // 格式化当前时间
      let time = this.$moment().format('lll')
      let from = 'human'
      let sendMsg = {from, msg, time}
      this.msgList.push(sendMsg)
      this.$nextTick(() => {
        this.scroll()
      })
      if (msg.trim()) {
        this.textarea = ''
        if (this.received) {
          this.ws.send(msg)
          this.received = false
        }
      }
    },
    show () {
      if (this.count % 3 === 1) {
        this.$refs.dialog.show()
      } else if (this.count % 3 === 2) {
        this.$refs.dialog.close()
      } else {
        this.$refs.dialog.showModal()
      }
      this.count++
    },
    closeDialog () {
      this.$refs.dialog.close()
    },
    scroll () {
      let height = this.$refs.msgContent.offsetHeight
      let scrollHeight = this.$refs.msgContent.scrollHeight
      if (scrollHeight > height) {
        this.$refs.msgContent.scrollTop = scrollHeight - height
      }
    },
    formatTime (time) {
      return formatTime(time)
    },
    /**
     * 自定义指令
     */
    onscroll () {

    }
  }
}
</script>

<style lang="less" scoped>
.m-chat {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  dialog {
    border-radius: 5px;
  }
  section {
    flex:1;
    display: flex;
    flex-direction: column;
    background: url(https://cn.bing.com/az/hprichbg/rb/Liverpool_ZH-CN12418492140_1920x1080.jpg) no-repeat;
    // background: url(https://cn.bing.com/az/hprichbg/rb/FlyinDrivein_ZH-CN11097970692_1920x1080.jpg) no-repeat;
    background-position: 0 60px;
    background-size: cover;
    header {
      display: flex;
      align-items: center;
      height: 60px;
      flex-shrink: 0;
      padding: 10px;
      color: #f56c6c;
      h3 {
        letter-spacing: 2px;
      }
    }
    .chat-content {
      flex: 1;
      padding-top: 5px;
      padding-bottom: 60px;
      overflow-y: auto;
      overflow-x: hidden;
      .time {
        text-align: center;
        time {
          margin: 0 auto;
          background: #dedede;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 12px;
          text-align: center;
          color: #444;
        }
      }
      .chat {
        display: flex;
        padding: 12px 8px;
        .avatar {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          background: url('../../../assets/images/ws-chat/hero.jpg') no-repeat;
          background-size: 100%;
        }
        .msg {
          position: relative;
          margin: 0 15px;
          padding: 0 10px;
          border-radius: 5px;
          display: flex;
          background: #fff;
          p {
            line-height: 36px;
          }
        }
        &.martina {
          .avatar {
            background: url('../../../assets/images/ws-chat/monster.jpg') no-repeat;
            background-size: 100%;
          }
          .msg {
            &::before {
              position: absolute;
              content: '';
              top: 10px;
              left: -14px;
              border: 8px solid transparent;
              border-right-color: #fff;
            }
          }
        }
        &.human {
          flex-direction: row-reverse;
          .msg {
            background: #67c23a;
            &::after {
              position: absolute;
              content: '';
              top: 10px;
              right: -14px;
              border: 8px solid transparent;
              border-left-color: #67c23a;
            }
          }
        }
      }
    }
  }
  footer{
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 60px;
    padding: 0 12px;
    border-top: 1px solid #888;
    background: #fff;
    button {
      margin-left: 15px;
    }
  }
}
</style>

