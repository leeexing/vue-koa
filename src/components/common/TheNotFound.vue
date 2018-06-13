<template>
  <div class="m-not-found">
    <h1>404</h1>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  mounted () {
    setTimeout(() => {
      this.$router.push('/leeing')
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.m-not-found {
  height: 100%;
  background: url('../../assets/images/404.jpg') no-repeat;
  background-position: center;
  h1 {
    padding: 20px;
    background-color: #333;
    color: #eee;
    font-size: 24px;
  }
}
</style>
