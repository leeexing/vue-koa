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
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  z-index: 9;
  overflow-y: auto;
}
 
</style>
