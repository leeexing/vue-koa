<template>
  <div class="m-dr">
    <h1 class="title">DR实验室</h1>
    <hr>
    <div class="btn-group">
      <el-button type="success" round @click="showImg">DR显示</el-button>
    </div>
    <full-screen :isShow="isShow" :src="src" v-on:changeIsShow="toggleIsShow" ref="nstswrap"/>
    <!-- <div ref="nsts">
      <transition name="nstsimg">
        <div v-if="layerShow" id="nsts">
          <el-button @click="showImg" class="exit" type="danger" size="mini" icon="el-icon-close" round title="退出"></el-button>
          <iframe class="nsts-wrapper" :src="src" frameborder="0" id="myframe"></iframe>
        </div>
      </transition>
    </div> -->
  </div>
</template>
<script>
import FullScreen from '@/components/common/FullScreen.vue'
export default {
  data () {
    return {
      isShow: false,
      src: ''
    }
  },
  mounted () {
    // this.$http.get('http://10.13.62.25:8070/api/DR/Query?types=None&PageNO=1&Limit=11&Offset=1', {
    //   headers: {
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NUVEMjkyQTkwQUNFQkNGNUZCNTYxOTNBMzMxQ0NDMiIsImlhdCI6MTUxNjg0NjI0MCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjYwMDY0MDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM2MDgwNzkyMzkzMzA1MzMzMDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lEIjoiMzYwODA3OTIzOTMzMDUzMzM3NiIsIkVudGVycHJpc2VDb2RlIjoiIiwibmJmIjoxNTE2ODQ2MjM5LCJleHAiOjE1NDI4NTI2MzksImlzcyI6Ik5TVFMuTlVDVEVDSC5DT00iLCJhdWQiOiJOU1RTX1VTRVIifQ.3_aYso892uDawzGIh46EKx8t2cYuk6i01t9EZmUD2uw'
    //   }
    // })
    //   .then(data => {
    //     console.log(data)
    //   })
  },
  methods: {
    showImg () {
      this.isShow = !this.isShow
      // this.src = '../../src/assets/xxx.html'
      // this.src = '/static/dr/index.html?business=INSERT_TIP&paperID=2&activeID=3'
      this.src = '/static/dr/DR_base.html?business=MAP_BROWSE&paperID=2&activeID=3'
      // this.src = '/static/dr/CT_base.html?business=MAP_BROWSE&paperID=2&activeID=3'
      this.$refs.nstswrap.fullScreen()
    },
    toggleIsShow (val) {
      this.isShow = val
      this.src = null
    }
  },
  components: {
    FullScreen
  }
}
</script>

<style lang="less" scoped>
  .m-dr {
    .title {
      padding: 20px;
      color: #fa541c;
      letter-spacing: 2px;
    }
    .btn-group {
      padding: 10px;
      background: url(../../../assets/logo.png)
    }
  }
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
    .nsts-wrapper {
      width: 100%;
      height: 100%;;
    }
  }
  .nstsimg-enter-active, .nstsimg-leave-active{
    transition: all 1s ease;
  }
  .nstsimg-enter {
    opacity: 0;
    transform: scale(.3);
  }
  .nstsimg-leave-to {
    opacity: 0;
    transform: translate3d(50%);
  }
</style>
