<template>
  <div class="m-nav-blog">
    <img class="user-logo" :src="avatarUrl" alt="作者" @dbclick="addArticle">
    <p class="username">{{username}}</p>
    <p class="hobby" v-waves:center>{{hobbies}}</p>
    <p class="github">
      <a href="https://github.com/leeexing">
        <i class="iconfont icon-github" title="leeing's github"></i>
      </a>
    </p>
    <ul>
      <li class="category" v-for="item in categories" :key="item.id" v-waves>
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data () {
    return {
      hobbies: 'love song, love bike',
      categories: ['Vue', 'Koa', 'Mongodb', 'Webpack', 'Python', '🆑倾其所有🔰']
    }
  },
  mounted () {
    // 头像轮播。TODO: 需要再做优化
  },
  computed: {
    ...mapGetters([
      'username',
      'avatarUrl'
    ])
  },
  methods: {
    addArticle () {
      console.log(78897)
      api.getProxyUser().then(res => {
        console.log(res)
      }).catch(err => console.log(err))
      // this.subpageShow = true
      // api.addNewMenu({name: '个人设置', url: '/setting'}).then(res => {
      //   // api.addArticleMock({title: '星期四'}).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-nav-blog {
  flex: 1;
  width: 100%;
  padding: 10px;
  text-align: center;
  p {
    padding-top: 10px;
  }
  .user-logo {
    max-width: 200px;
    border-radius: 5px;
    transition: all .3s;
  }
  .username {
    font-size: 24px;
    color: #666;
  }
  .about-me {
    color: #666;
    cursor: pointer;
    &:hover {
      color: #f90;
    }
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
 
</style>
