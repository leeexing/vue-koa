<template>
  <div class="article-detail">
    <header>
      <h3>{{article.title}}</h3>
      <p class="info">作者：{{article.author}} - 浏览次数：{{article.meta.visit}}</p>
    </header>
    <article>
      {{article.body}}
    </article>
    <section class="comment">
      <h3 class="comment-header">评论</h3>
      <div class="edit">
        <div class="input">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            @keyup.enter.native="postComment"
            v-model="comment">
          </el-input>
        </div>
        <div class="post">
          <el-button type="success" size="small" @click="postComment">发表评论</el-button>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in article.comments">
          <div class="avatar">
            <img :src="item.avatar ? item.avatar : '/static/images/logo_1.png'" alt="avatar">
          </div>
          <div class="content">
            <h3>{{item.author}}</h3>
            <p>{{item.body}}</p>
            <p class="time"><i class="el-icon-edit"></i>{{item.date.replace('T', ' ').replace(/\.\w+/, '')}}</p>
          </div>
        </div>
      </div>
    </section>
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
        body: '',
        meta: {
          visit: '',
          vote: '',
          favs: ''
        }
      },
      comment: '',
      commentList: []
    }
  },
  mounted () {
    // console.log(this.$route.params)
    let id = this.$route.params.id
    if (id) {
      this.id = id
      this.getArticleDetail()
    }
  },
  methods: {
    getArticleDetail () {
      api.getArticleDetail(this.id).then(res => {
        console.log(res)
        this.article = res.data.data
      }).catch(err => {
        console.error(err)
      })
    },
    postComment () {
      if (this.comment) {
        let postData = {
          username: this.$store.state.username,
          comment: this.comment
        }
        api.postArticleComment(this.$route.params.id, postData)
          .then(res => {
            console.log(res)
            if (res.success) {
              this.$message.success(res.message)
              this.comment = ''
              this.getArticleDetail()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.warning('评论内容不能为空！')
      }
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.article-detail {
  header {
    text-align: center;
    padding: 10px 0;
    background: linear-gradient(#606266, #444);
    // box-shadow: 0 1px 1px #606266;
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
  .comment {
    margin-top: 20px;
    .comment-header {
      padding-top: 15px;
    }
    .edit {
      display: flex;
      align-items: center;
      padding: 15px 0;
      .input {
        flex: 1;
      }
      .post {
        margin-left: 10px;
      }
    }
    .comment-list {
      margin-top: 20px;
      .comment-item {
        display: flex;
        border-bottom: 1px solid #ddd;
        .avatar {
          flex-shrink: 0;
          width: 60px;
          padding-right: 10px;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .content {
          flex: 1;
          padding-right: 15px;
          h3 {
            line-height: 24px;
          }
          p {
            line-height: 22px;
          }
          .time {
            font-size: 12px;
            color: 333;
            text-align: right;
            i {
              margin-right: 3px;
            }
          }
        }
      }

    }
  }
} 
</style>

