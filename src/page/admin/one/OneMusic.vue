<template>
  <div id="one-music">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="music">
      <h1>我的音乐我做主！</h1>
    </div>
  </div>
</template>

<script>
import oneServer from '@/util/server'
import BreadCrumb from '@/components/common/TheBreadCrumb'
export default {
  name: 'music',
  data () {
    return {
      breadinfo: [{name: '扩展应用'}, {name: '一个', path: '/admin/one'}, {name: 'Music'}]
    }
  },
  created () {
    async function getMusicData (ctx) {
      let data = await oneServer.getQQMusic(ctx)
      console.log(data)
    }
    getMusicData(this)
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
#one-music {
  .music {
    margin-top: 10px;
    padding: 10px;
    color: #3f51b5;
  }
}
</style>

