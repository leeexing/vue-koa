<template>
  <schart :canvasId="canvasId"
          :type="type"
          :width="width"
          :height="height"
          :data="data"
          :options="options"
          class="pie" ref="pie"
  ></schart>  
</template>

<script>
import Schart from 'vue-schart'
import Mock from 'mockjs'

export default {
  name: 'bar',
  data () {
    return {
      canvasId: 'pieCanvas',
      type: 'pie',
      width: 500,
      height: 400,
      data: [
        {name: Mock.mock('@name'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@name'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@name'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@name'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@name'), value: Mock.mock('@integer(1000, 2000)')}
      ],
      options: {
        title: Mock.mock('@ctitle(15)'),
        // bgColor: '#829dca',
        titleColor: '#f90'
      }
    }
  },
  mounted () {
    // this.width = Math.floor(document.getElementsByClassName('pie')[0].clientWidth - 1)
  },
  components: {
    Schart
  }
}
</script>

<style lang="less" scoped>
.pie {
  width: 100%;
}
</style>

