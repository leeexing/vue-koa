<template>
  <div class="nsts-index">
    <header>
      <h1>NSTS 实验室</h1>
    </header>
    <nav>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">虚拟键盘</el-menu-item>
        <el-menu-item index="3">理论课件</el-menu-item>
        <el-menu-item index="4" disabled>消息中心</el-menu-item>
        <el-menu-item index="5"><a href="http://localhost:8899" target="_blank">安检培训系统</a></el-menu-item>
      </el-menu>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NstsHome',
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted () {

  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '1':
          this.$router.push('/nsts')
          break
        case '2':
          this.$router.push('/nsts/keyboard')
          break
        case '3':
          this.$router.push('/nsts/course')
          break
        default:
          break
      }
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.nsts-index {
  header {
    padding: 10px;
    background: #000;
    h1 {
      color: #fff;
      font-size: 24px;
      word-spacing: 2px;
      letter-spacing: 2px;
    } 
  }
  nav {
    padding: 15px 50px;
  }
}
 
</style>
