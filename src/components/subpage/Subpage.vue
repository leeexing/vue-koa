<template>
  <div class="m-subpage">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script>
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
