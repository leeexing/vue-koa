<template>
  <div :class="className" :id="id" :style="customStyle"></div>
</template>

<script>
import echart from 'echart'
import {mixinChart} from '@/mixin'
export default {
  name: 'LineChart',
  mixins: [mixinChart],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          width: '200px',
          height: '200px'
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echart.init(document.getElementById(this.id))
    }
  },
  components: {

  }
}
</script>

<style lang="scss">

 
</style>
