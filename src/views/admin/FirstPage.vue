<template>
  <div class="home">
    <div class="bread">
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="chart">
      <el-row>
        <el-col :span="12">
          <v-bar></v-bar>
        </el-col>
        <el-col :span="12">
          <v-pie></v-pie>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <v-line></v-line>
        </el-col>
        <el-col :span="12">
          <v-ring></v-ring>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import VBar from './chart/ChartBar'
import VPie from './chart/ChartPie'
import VLine from './chart/ChartLine'
import VRing from './chart/ChartRing'
import Mock from 'mockjs'
export default {
  name: 'home',
  data () {
    return {
      breadinfo: [{name: '报表详情'}],
      canvasId: 'myCanvas',
      type: 'bar',
      width: 500,
      height: 400,
      data: [
        {name: '2014', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2015', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2016', value: Mock.mock('@integer(1000, 2000)')},
        {name: '2017', value: Mock.mock('@integer(1000, 2000)')}
      ],
      options: {
        title: Mock.mock('@title(3, 5)')
      }
    }
  },
  components: {
    BreadCrumb,
    VBar,
    VPie,
    VLine,
    VRing
  }
}
</script>

<style lang="less" scoped>
.home {
  flex: auto;
  .bread {
    border-bottom: 1px solid #ddd;
  }
  .chart {
    padding-top: 15px;
  }
}
</style>

