<template>
  <div class="slot">
    <ul class="slot-wrap">
      <slot name="item"
        v-for="item in items"
        :text="item.text"
        :msg="item.msg"
      >
        what 123
        <!-- <p>什么意思</p> -->
        <!-- 这里写入备用内容 -->
      </slot>
      <slot name="test" info="I dont know what this present">
        我也不知道这里些什么
      </slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: Number,
      required: true
    },
    items: {
      validator (val) {
        return Object.prototype.toString.call(val) === '[object Array]'
      }
    }
  },
  data () {
    return {
      hi: 'I dont know what this present',
      topic: '抡起巴比伦'
    }
  }
}
</script>

<style lang="less" scoped>
.slot {
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #999;
}
</style>


