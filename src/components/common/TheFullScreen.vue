<template>
  <div id="fullscreen" ref="nsts">
    <!-- <el-button @click="closeFullScreen" class="show" type="danger" size="mini" icon="el-icon-close" round title="退出"></el-button> -->
    <transition name="nstsimg">
      <div v-if="isShow" id="nsts">
        <el-button @click="closeFullScreen" class="exit" type="danger" size="mini" icon="el-icon-close" round title="退出"></el-button>
        <iframe class="nsts-wrapper" :src="src" frameborder="0" id="myframe"></iframe>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['isShow', 'src'],
  mounted () {
    let that = this
    this.docNsts = this.$refs.nsts
    this.fullScreenType = (function () {
      if (that.docNsts.requestFullscreen) {
        return ['requestFullscreen', 'exitFullscreen']
      } else if (that.docNsts.msRequestFullscreen) {
        return ['msRequestFullscreen', 'msExitFullscreen']
      } else if (that.docNsts.mozRequestFullScreen) {
        return ['mozRequestFullScreen', 'mozCancelFullScreen']
      } else if (that.docNsts.webkitRequestFullScreen) {
        return ['webkitRequestFullScreen', 'webkitCancelFullScreen']
      }
    })()
    // console.log(this.fullScreenType)
  },
  watch: {
    src (newVlaue, oldValue) {
      console.log(newVlaue, 'oldValue: ' + oldValue)
      // console.log(this.docNsts[this.fullScreenType[0]]())
      // if (newVlaue) {
      //   let docNsts = this.$refs.nsts
      //   console.log(docNsts)
      //   console.log(this.fullScreenType)
      //   docNsts[this.fullScreenType[0]]()
      // } else {
      //   document[this.fullScreenType[1]]()
      // }
    }
  },
  methods: {
    closeFullScreen () {
      this.$emit('changeIsShow', false)
      document[this.fullScreenType[1]]()
    },
    fullScreen () {
      this.docNsts[this.fullScreenType[0]]()
    }
  }
}
</script>

<style lang="less">
#nsts {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
    .exit {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .show {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .nsts-wrapper {
      width: 100%;
      height: 100%;;
    }
  }
</style>


