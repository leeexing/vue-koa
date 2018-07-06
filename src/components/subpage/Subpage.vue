<template>
  <div class="m-subpage" :style="customStyle">
    <i v-if="hasBack" @click="$router.go(-1)" class="el-icon-back back"></i>
    <slot name="header"></slot>
    <slot></slot>
    <template slot-scope="scope">
      <span>{{scope.row.contain_prodId.join(',')}}</span>
    </template>
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
    },
    hasBack: {
      type: Boolean,
      default: false
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
  .back {
    position: absolute;
    top: 10px;
    right: 5px;
    transition: all .3s;
    cursor: pointer;
    &:hover {
      color: #1890ff;
      transform: translateX(-5px) scaleX(1.2);
    }
  }
}
 
</style>
