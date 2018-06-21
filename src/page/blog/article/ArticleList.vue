<template>
  <div class="m-topic">
    <el-row v-loading.body="loading">
      <el-col class="topic-item" :span="24" v-for="item in articleList" :key="item.id">
        <h1 class="title">{{item.title}}</h1>
        <p class="time">
          <span>{{item.date | formatMongoTime}}</span>
          <span>阅读次数：{{item.meta.visit}}</span>
          </p>
        <p class="brife" v-html="item.brief"></p>
        <a class="continue" @click="goDetail(item)">展开全文</a>
      </el-col>
    </el-row>

    <div class="pages" v-if="articleList.length">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="pageSize"
        :total="totalPage">
      </el-pagination>
    </div>
    <p v-else class="no-content">暂无文章内容，请及时添加~😀</p>
  </div>
</template>

<script>
import api from '@/api'
import {mixinCommon} from '@/mixin'
export default {
  name: 'topic',
  mixins: [mixinCommon],
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
  methods: {
    fetchArticle () {
      api.getArticleList({pageSize: this.pageSize, currentPage: this.currentPage}).then(res => {
        console.log(res)
        this.articleList = res.data.articles
        this.totalPage = res.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    currentChange (val) {
      this.currentPage = val
      this.fetchArticle()
      window.scrollTo({top: 0})
    },
    goDetail (data) {
      let id = data._id
      this.$router.push(`/leeing/article/${id}`)
    }
  }
}
</script>

<style lang="scss">
.m-topic {
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
      float: right;
      margin-right: 15px;
      padding: 8px 10px;
      border: 1px solid #444;
      background: #333;
      font-size: 14px;
      color: #fff;
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
  .no-content {
    margin-top: 20px;
    padding: 15px;
    text-align: center;
    color: #333;
  }
}
.el-pager {
  li {
    color: #f90;
  }
}
</style>


