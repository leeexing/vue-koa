<template>
  <div class="m-no-auth">
    <h1>骚年，请滚回去 ~ 💔</h1>
    <main></main>
  </div>
</template>

<script>
export default {
  name: 'noAuthorized',
  mounted () {
    setTimeout(() => {
      this.$router.push('/login')
    }, 3000)
  }
}
</script>

<style lang="scss">
.m-no-auth {
  display: flex;
  flex-direction: column;
  height: 100%;
  h1 {
    padding: 20px;
    background-color: #333;
    color: #eee;
    font-size: 24px;
    text-align: center;
  }
  main {
    flex: 1;
    background: url('../../assets/images/401.gif') no-repeat;
    background-position: center;
  }
}
 
</style>
