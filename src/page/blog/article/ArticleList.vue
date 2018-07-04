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
        <div class="info">
          <p class="category">
            <i class="iconfont icon-tag"></i>
            <span v-for="item in item.category" :key="item.id">{{item}}</span>
          </p>
          <a class="continue" @click="goDetail(item)">展开全文</a>
        </div>
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
    <div v-else class="no-content">
      <p>暂无文章内容，请及时添加~😀</p>
      <!-- <img src="../../../assets/images/content.jpg" alt="NO_CONTENT"> -->
      <img src="../../../assets/images/no-content.jpg" alt="NO_CONTENT">
    </div>
  </div>
</template>

<script>
import api from '@/api'
import {mixinCommon} from '@/mixin'
import {mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters([
      'currentCate'
    ])
  },
  methods: {
    fetchArticle () {
      api.getArticleList({pageSize: this.pageSize, currentPage: this.currentPage, category: this.currentCate}).then(res => {
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
  },
  watch: {
    currentCate () {
      this.fetchArticle()
    }
  }
}
</script>

<style lang="scss">
.m-topic {
  .topic-item {
    margin-top: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    .title {
      padding: 15px 0;
      text-align: center;
      font-size: 26px;
      font-weight: 600;
    }
    .time {
      text-align: center;
      font-size: 14px;
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
    .info {
      display: flex;
      padding-right: 15px;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      .category {
        span {
          display: inline-block;
          position: relative;
          height: 20px;
          padding: 3px 5px 3px 10px;
          margin-left: 15px;
          margin-right: 3px;
          background: #ad6800;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          color: #fff;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -20px;
            height: 0;
            border: 10px solid transparent;
            border-right-color: #ad6800;
          }
          &::after {
            content: "";
            position: absolute;
            top: 8px;
            left: 2px;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
          }
        }
      }
    }
    .continue {
      float: right;
      padding: 8px 10px;
      border: 1px solid #444;
      background: #333;
      font-size: 14px;
      color: #fff;
      &:hover {
        opacity: .9;
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
    img {
      width: 50%;
      margin-top: 100px;
      filter: blur(3px);
      transition: all 1s;
      &:hover {
        filter: blur(0);
      }
    }
  }
}
.el-pager {
  li {
    color: #f90;
  }
}
</style>


