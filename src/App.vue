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

<style lang="scss">
html {
  height: 100%;
  background: #fafafa;
}
body {
  display: flex;
  flex-direction: column;
  height: 100%;
  // min-height: 100%;
}
#app {
  flex: 1;
  background: linear-gradient(#fffad0, #fff);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
