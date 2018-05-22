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
        <a class="continue" @click="goDetail(item)">继续阅读...</a>
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
import api from '@/api'
// import '@/util/mock'

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
    api.getArticleList().then(res => {
      console.log(res)
      this.topicData = res.data.data.articles
      this.totalTopics = this.topicData.length
    }).catch(err => {
      console.error(err)
    })
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
    },
    goDetail (data) {
      console.log(data)
      let {id} = data
      this.$router.push(`/leeing/article/${id}`)
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


