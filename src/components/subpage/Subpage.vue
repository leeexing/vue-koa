<template>
  <div class="m-subpage" :style="customStyle">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    customStyle: {
      type: Object,
      default () {
        return {
          background: '#f5f5f5'
        }
      }
    }
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
  z-index: 9;
  overflow-y: auto;
}
 
</style>
