<template>
  <div class="server-error">
    <header>
      <h1>500 -- server error</h1>
    </header>
    <main>
      <h3>
        <router-link to="/leeing">返回首页</router-link>
      </h3>
      <article class="message">
        <div v-html="errorMessage"></div>
        <!-- {{errorMessage}} -->
      </article>
    </main>
  </div>
</template>

<script>
export default {
  name: 'serverError',
  data () {
    return {
      errorMessage: 'Nothing'
    }
  },
  mounted () {
    // console.log(this.$route)
    this.errorMessage = this.syntaxHighlight(this.$route.params.errorMessage)
  },
  methods: {
    syntaxHighlight (json) {
      if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2)
      }
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      let html = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+|-]?\d+)?)/g, function (match) {
        let cls = 'number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key'
          } else {
            cls = 'string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
      })
      return html
    }
  }
}
</script>

<style lang="scss" scoped>
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
    h3 {
      padding: 20px;
    }
    .message {
      padding: 20px;
      background: rgba(0,0,0,.1);
      word-wrap: break-word;
      p {
        font-family: 'Courier New', Courier, monospace;
        line-height: 26px;
        font-size: 14px;
        color: #ff9c6e;
      }
    }
  }
}
</style>
<style lang="scss">
  .pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
  .string { color: green; }
  .number { color: darkorange; }
  .boolean { color: blue; }
  .null { color: magenta; }
  .key { color: red; }
</style>

