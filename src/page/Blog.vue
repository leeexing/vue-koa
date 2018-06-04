<template>
  <div class="m-content">
    <header-vue></header-vue>
    <div class="topic-wrap">
      <el-row>
        <el-col :span="7">
          <div class="userinfo">
            <img class="user-logo" :src="avatarUrl" alt="作者" @click="addArticle">
            <p class="username" @click="test">{{username}}</p>
            <p class="hobby">{{hobbies}}</p>
            <p class="github">
              <a href="https://github.com/leeexing">
              <i class="iconfont icon-github" title="leeing's github"></i>
              </a>
            </p>
            <ul>
              <li class="category" v-for="item in categories" :key="item.id">
                {{item}}
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16" :offset="1">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <footer>
      <p>Copyright © | LEEING 2017</p>
      <p>Created by <span class="author">vue-koa-blog</span></p>
    </footer>
  </div>
</template>

<script>
  import api from '@/api'
  import HeaderVue from '@/components/header/HeaderBlog.vue'
  import ArticleList from '@/page/blog/topic/ArticleList.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'index',
    data () {
      return {
        // logoSrc: 'http://localhost:8081/logo_5.png',
        // logoSrc: '/static/images/logo_1.png',
        hobbies: 'love song, love bike',
        categories: ['Vue', 'Koa', 'Mongodb', 'Webpack', 'Python', '🆑倾其所有🔰']
      }
    },
    mounted () {
      // 头像轮播。TODO: 需要再做优化
      // let logoSrcIndex = 1
      // this.logoTimer = setInterval(() => {
      //   if (logoSrcIndex > 4) {
      //     logoSrcIndex = 1
      //   }
      //   this.logoSrc = `/static/images/logo_${logoSrcIndex++}.png`
      // }, 60000)
      // 回复用户保存的数据。FIXME: 使用 vuex-along 后将这个注释掉
      // this.$store.commit('FLASH_STATE')
    },
    beforeDestroy () {
      clearInterval(this.logoTimer)
    },
    computed: {
      ...mapGetters([
        'username',
        'avatarUrl'
      ])
    },
    methods: {
      test () {
        api.getMusic({num: 5, name: '周杰伦'}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      addArticle () {
        api.addArticle({title: '星期四'}).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      HeaderVue,
      ArticleList
    }
  }
</script>

<style lang="less">
.m-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 80px;
  .topic-wrap {
    margin-bottom: 30px;
  }
}
.userinfo {
  margin-top: 20px;
  text-align: center;
  p {
    padding-top: 10px;
  }
  .user-logo {
    width: 200px;
    border-radius: 5px;
    transition: all .3s;
  }
  .username {
    font-size: 24px;
    color: #666;
  }
  .github {
    i {
      color: #aaa;
      font-size: 24px;
    }
  }
  .hobby {
    font-size: 18px;
    color: #999;
  }
  ul {
    margin-top: 20px;
  }
  .category {
    display: inline-block;
    margin: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    color: #aaa;
    cursor: pointer;
    &:hover {
      border-color: #f90;
      color: #f90;
      transition: all ease 0.3s;
    }
  }
}
footer {
  flex-basis: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding: 5px 0;
    color: #aaa;
    font-size: 16px;
  }
  p:nth-child(2) {
    font-size: 14px;
    span {
      color: #666;
    }
  }
}

</style>
