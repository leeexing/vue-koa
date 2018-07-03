<template>
  <footer class="m-footer">
    <p>created by vue-koa</p>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
.m-footer {
  flex-basis: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    position: relative;
    color: #bbb;
    font-size: 16px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    &::after {
      content: "-- 我也是有底线的 --";
      position: absolute;
      width: 100%;
      bottom: -100%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      text-align: center;
      opacity: 0;
      transition: all .3s;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
