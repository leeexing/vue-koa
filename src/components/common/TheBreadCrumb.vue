<template>
  <el-breadcrumb class="m-bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: home.path }">{{home.name}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path: item.path}" v-for="item in breads" :key="item.id">{{item.name}}</el-breadcrumb-item>
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

<style lang="scss" scoped>
.m-bread {
  padding: 10px;
}
</style>
