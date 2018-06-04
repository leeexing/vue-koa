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
  display: flex;
  flex-direction: column;
  height: 100%;
  h1 {
    padding: 20px;
    background-color: #444;
    color: #fff;
    font-size: 26px;
  }
  main {
    flex: 1;
    background: url('../../assets/images/500.png') no-repeat;
    background-position: center;
    .message {
      padding: 20px;
      background: rgba(0,0,0,.1);
      word-wrap: break-word;
    }
  }
}
 
</style>
