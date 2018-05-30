<template>
  <div class="slot-list">
    <div class="title">{{ title }}</div>
    <ul class="list">
      <li v-for="shape in shapes" class="list-item" :key="shape.id">
        <!-- <div>{{ shape.name }} <small>({{ shape.sides }} - sides)</small></div> 这样写就将展现的功能写死了 -->
        <!-- <slot></slot>  其实还可以将 v-for 用在 slot 上面，而不是 li 上面 -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'slot-demo'
}
</script>

<style lang="less" scoped>
.slot-list {
  margin-top: 10px;
}
</style>


