<template>
  <schart :canvasId="canvasId"
          :type="type"
          :width="width"
          :height="height"
          :data="data"
          :options="options"
          class="line" ref="line"
  ></schart>  
</template>

<script>
import Schart from 'vue-schart'
import Mock from 'mockjs'

export default {
  name: 'bar',
  data () {
    return {
      canvasId: 'lineCanvas',
      type: 'line',
      width: 500,
      height: 400,
      fillColor: '#72f6ff',
      data: [
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')},
        {name: Mock.mock('@word(3)'), value: Mock.mock('@integer(1000, 2000)')}
      ],
      options: {
        title: Mock.mock('@ctitle(15)'),
        titlePosition: 'top',
        titleColor: '#f90'
      }
    }
  },
  mounted () {
    // this.width = Math.floor(document.getElementsByClassName('line')[0].clientWidth - 1)
  },
  components: {
    Schart
  }
}
</script>

<style lang="less" scoped>
.line {
  width: 100%;
}
</style>

