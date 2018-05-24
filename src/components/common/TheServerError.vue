<template>
  <div class="server-error">
    <header>
      <h1>500 -- server error</h1>
    </header>
    <main>
      <p class="message">
        错误消息：{{errorMessage}}
      </p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'serverError',
  data () {
    return {
      errorMessage: ''
    }
  },
  mounted () {
    // console.log(this.$route)
    this.errorMessage = this.$route.params.errorMessage
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="scss">
.server-error {
  h1 {
    padding: 20px;
    background-color: #444;
    color: #fff;
    font-size: 26px;
  }
  .message {
    padding: 20px;
    background: #ff9c6e;
    color: #eee;
  }
}
 
</style>
