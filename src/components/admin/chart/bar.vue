<template>
  <schart :canvasId="canvasId"
          :type="type"
          :width="width"
          :height="height"
          :data="data"
          :options="options"
          class="bar" ref="bar"
  ></schart>  
</template>

<script>
import Schart from 'vue-schart'
import Mock from 'mockjs'

export default {
  name: 'bar',
  data () {
    return {
      canvasId: 'myCanvas',
      type: 'bar',
      width: 500,
      height: 400,
      data: [
        {name: '2014', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2015', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2016', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2016', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2017', value: Mock.mock('@integer(1000, 2000)')}
      ],
      options: {
        title: Mock.mock('@ctitle(15)')
      }
    }
  },
  mounted () {
    // this.width = Math.floor(document.getElementsByClassName('bar')[0].clientWidth - 1)
  },
  components: {
    Schart
  }
}
</script>

<style lang="less" scoped>
.bar {
  width: 100%;
}
</style>

