<template>
  <div class="topic">
    <el-row v-loading.body="loading">
      <el-col class="topic-item" :span="24" v-for="item in articleList" :key="item.id">
        <h1 class="title">{{item.title}}</h1>
        <p class="time">
          <span>{{item.date}}</span>
          <span>阅读次数：{{item.meta.visit}}</span>
          </p>
        <p class="brife">{{item.brief}}</p>
        <a class="continue" @click="goDetail(item)">继续阅读...</a>
      </el-col>
    </el-row>
    <div class="pages">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="pageSize"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api'
// import '@/util/mock'

export default {
  name: 'topic',
  data () {
    return {
      articleList: [],
      totalPage: 0,
      pageSize: 5,
      currentPage: 1,
      loading: false
    }
  },
  created () {
    this.fetchArticle()
  },
  mounted () {
    console.log(this.$store.state)
  },
  methods: {
    fetchArticle () {
      api.getArticleList({pageSize: this.pageSize, currentPage: this.currentPage}).then(res => {
        console.log(res)
        this.articleList = res.data.data.articles
        this.totalPage = res.data.data.count
      }).catch(err => {
        console.log(err.data)
      })
    },
    currentChange (val) {
      this.currentPage = val
      this.fetchArticle()
      window.scrollTo({top: 0})
    },
    goDetail (data) {
      console.log(data)
      let id = data._id
      this.$router.push(`/leeing/article/${id}`)
    }
  }
}
</script>

<style lang="scss">
.topic {
  .topic-item {
    margin-top: 20px;
    .title {
      padding: 15px 0;
      font-size: 30px;
      font-weight: 600;
    }
    .time {
      font-size: 18px;
      color: #aaa;
      span:nth-of-type(2) {
        margin-left: 50px;
      }
    }
    .brife {
      padding: 15px 0;
      font-size: 18px;
      line-height: 28px;
    }
    .continue {
      color: #0288d1;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .pages {
    display: flex;
    justify-content: center;
    padding: 15px;
  }
}
</style>


