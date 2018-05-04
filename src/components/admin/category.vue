<template>
  <div class="category">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="content-c">
      <h1>待完成...</h1>
    </div>
  </div>
</template>

<script>
import BreadCrumb from './breadcrumb'
export default {
  name: 'Category',
  data () {
    return {
      breadinfo: [{name: '博客管理', path: '/myadmin/artical'}, {name: '文章分类'}]
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
.content-c {
  padding: 15px 10px;
}
</style>

