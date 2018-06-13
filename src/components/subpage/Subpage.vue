<template>
  <div class="m-subpage">
    <!-- <bread-crumb :home="home" :breads="breads"></bread-crumb> -->
    <slot name="bread"></slot>
    <slot></slot>
  </div>
</template>

<script>
import BreadCrumb from '../breadcrumb/BreadCrumb'
export default {
  name: '',
  props: {
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="scss">
.m-subpage {
  position: absolute;
  top: 80px;
  right: 0;
  width: 100%;
  min-height: 400px;
  background: #eee;
}
 
</style>
