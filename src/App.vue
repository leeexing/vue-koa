<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
html, body {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  background: #fafafa;
}
body {
  // height: 100%;
  min-height: 100%;
  background: linear-gradient(#fffad0, #fff);
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}
</style>
