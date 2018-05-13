<template>
  <div class="topic">
    <el-row v-loading.body="loading">
      <el-col class="topic-item" :span="24" v-for="item in topicList" :key="item.id">
        <h1 class="title">{{item.title}}</h1>
        <p class="time">
          <span>{{item.time}}</span>
          <span>阅读次数：{{item.visit}}</span>
          </p>
        <p class="brife">{{item.content}}</p>
        <a class="continue" href="#">继续阅读...</a>
      </el-col>
    </el-row>
    <div class="pages">
      <el-pagination
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="pageSize"
        :total="totalTopics">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import data from './data'
// import data from '@/util/mock' // 这种事静态方法，没有设置url，没有使用$http请求
import '@/util/mock2'

export default {
  name: 'topic',
  data () {
    return {
      topicData: [],
      totalTopics: 0,
      pageSize: 5,
      currentPage: 1,
      loading: false
    }
  },
  created () {
    this.$http.get('/admin/topiclist')
      .then(data => {
        this.topicData = data.data.topics
        this.totalTopics = this.topicData.length
      })
      .catch(err => {
        console.log(err)
      })
    /* this.topicData = data.topics // 这种是静态获取资源的笨方法
    this.totalTopics = this.topicData.length */
  },
  computed: {
    topicList () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = Math.min(this.totalTopics, this.pageSize * this.currentPage)
      return this.topicData.slice(start, end)
    }
  },
  methods: {
    currentChange (val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="less">
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


