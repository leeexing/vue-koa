<template>
  <div class="server-error">
    <header>
      <h1>500</h1>
    </header>
    <main>
      <p class="content">
        {{errorMessage}}
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
    this.errorMessage = this.$route.meta.errorMessage
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
  }
  .content {
    padding: 20px;
    background: #777;
    color: #eee;
  }
}
 
</style>
