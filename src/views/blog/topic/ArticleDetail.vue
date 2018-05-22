<template>
  <div class="article-detail">
    <header>
      <h3>{{article.title}}</h3>
      <p class="info">作者：{{article.author}} - 浏览次数：{{article.visit}}</p>
    </header>
    <article>
      {{article.content}}
    </article>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    console.log(this.$route.params)
    let id = this.$route.params.id
    if (id) {
      api.getArticleDetail(id).then(res => {
        console.log(res)
        this.article = res.data.data.article
      }).catch(err => {
        console.error(err)
      })
    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style lang="scss">
.article-detail {
  header {
    text-align: center;
    background-color: #666;
    padding: 10px 0;
    color: #fff;
    h3 {
      padding: 10px;
      font-size: 22px;
      word-spacing: 2px;
    }
    p {
      color: #aaa;
      font-size: 14px;
    }
  }
  article {
    padding-top: 15px;
    line-height: 24px;
  }
} 
</style>

