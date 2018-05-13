<template>
  <div class="m-mask" :class="{show: isShowMask}" @click="closeMask">
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'leeMask',
    computed: {
      ...mapGetters([
        'isShowMask'
      ])
    },
    methods: {
      closeMask () {
        // this.$store.dispatch('close_mask')
      }
    }
  }
</script>

<style lang="less" scoped>
.m-mask {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  &.show {
    display: block;
  }
}
</style>
