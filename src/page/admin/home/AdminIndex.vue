<template>
  <div class="m-home" ref="goal">
    <div class="barrage-wrap" ref="barrage"></div>
    <div class="publish">
      <el-input
        placeholder="📢请输入弹幕内容⚽🥇🥈🥉🏆"
        v-model="barrage"
        @keyup.enter.native="shoot"
        clearable>
      </el-input>
      <el-button @click="shoot" class="shoot" type="danger">起脚射门</el-button>
      <el-button @click="fullScreen" class="shoot" type="success">⚽</el-button>
    </div>
  </div>
</template>

<script>
const barrageJson = require('./barrage.json')
import {requestFullScreen} from '@/util'
export default {
  name: 'home',
  data () {
    return {
      colors: barrageJson.colors,
      speed: barrageJson.speed,
      classname: barrageJson.classname,
      text: barrageJson.text,
      barrage: ''
    }
  },
  mounted () {
    this.docNsts = this.$refs.goal
    this.fullScreenType = requestFullScreen()

    let barrageDom = document.querySelector('.barrage-wrap')
    this.send = this.$start(barrageDom)
    this.timer = setInterval(() => {
      this.goooooal()
    }, 1000)
    // 清除定时器 方法二
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
    })
  },
  beforeDestroy () {
    // 清除定时器 方法一
    // if (this.timer) {
    //   clearInterval(this.timer)
    // }
  },
  methods: {
    goooooal () {
      let text = this.text[Math.floor(Math.random() * this.text.length)]
      let style = this.getStyle()
      this.send({text, ...style})
    },
    shoot () {
      if (this.barrage.trim()) {
        let style = {
          text: this.barrage,
          color: '#fa541c',
          speed: Math.ceil(Math.random() * 3),
          classname: `goal${Math.ceil(Math.random() * 3)}`
        }
        this.send(style)
        this.barrage = ''
      }
    },
    getStyle () {
      // let color = this.colors[Math.floor(Math.random() * this.colors.length)]
      let color = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
      let speed = Math.ceil(Math.random() * 10)
      let classname = `style${Math.ceil(Math.random() * 20)}`
      return {color, speed, classname}
    },
    fullScreen () {
      this.docNsts[this.fullScreenType[0]]()
    }
  }
}
</script>
<style lang="scss">
.goal1 {
  font-size: 24px;
  border-radius: 10px;
  background: -webkit-linear-gradient(left, #f5f5f5 50%, rgba(255,255,255,0.2) 100%);
	background: -o-linear-gradient(right, #f5f5f5 50%, rgba(255,255,255,0.2) 100%);
	background: -moz-linear-gradient(right, #f5f5f5 50%, rgba(255,255,255,0.2) 100%);
	background: linear-gradient(to right, #f5f5f5 50%, rgba(255,255,255,0.2) 100%);
}
.goal2 {
  font-size: 20px;
  border-radius: 10px;
  background: -webkit-linear-gradient(left, #fadb14 50%, #faad14 100%);
	background: -o-linear-gradient(right, #fadb14 50%, #faad14 100%);
	background: -moz-linear-gradient(right, #fadb14 50%, #faad14 100%);
	background: linear-gradient(to right, #fadb14 50%, #faad14 100%);
}
.goal3 {
  font-size: 20px;
  border-radius: 10px;
  background: -webkit-linear-gradient(left, #13c2c2 100%);
}
</style>

<style lang="less" scoped>
.m-home {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  min-height: 100%;
  .barrage-wrap {
    flex: 1;
    background: rgba(0,0,0,.8);
    min-height: 500px;
    border-radius: 8px;
  }
  .publish {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    .shoot {
      margin-left: 15px;
    }
  }
}
</style>

