<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: home.path }">{{home.name}}</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breads" :key="item.id">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  props: {
    home: {
      type: Object,
      default: () => {
        return {
          name: '首页',
          path: '/admin'
        }
      }
    },
    breads: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>
