<template>
  <div class="m-nav-blog">
    <img class="user-logo" :src="avatarUrl" alt="作者" @dblclick="mockArticle2Db">
    <p class="username">{{username}}</p>
    <p class="signature" v-waves:center>{{signature}}</p>
    <p class="github">
      <a href="https://github.com/leeexing" target="_blank">
        <i class="iconfont icon-github" title="leeing's github"></i>
      </a>
      <!-- <a>
        <i class="iconfont icon-sina" title="leeing's weibo"></i>
      </a>
      <a>
        <i class="iconfont icon-weixin" title="leeing's wechat"></i>
      </a> -->
    </p>
    <p class="photo" v-waves @click="$router.push('/leeing/photos')">相册</p>
    <ul>
      <li class="category" v-for="item in categories" :key="item.id" @click="scanTheCate(item)" v-waves>
        {{item.name}}
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
      categories: [{name: '所有文章', _id: 0}]
    }
  },
  mounted () {
    // 头像轮播。TODO: 需要再做优化
    this.fetchBaseInfo()
  },
  computed: {
    ...mapGetters([
      'username',
      'avatarUrl',
      'signature'
    ])
  },
  methods: {
    fetchBaseInfo () {
      api.getCategories().then(res => {
        console.log(res)
        this.categories = [...this.categories, ...res.data]
      }).catch(console.log)
    },
    mockArticle2Db () {
      api.addArticleMock().then(console.log)
    },
    scanTheCate (data) {
      this.$router.push('/articles')
      this.$store.dispatch('changeCurrentCate', data._id === 0 ? 'all' : data.name)
    },
    testProxyApi () {
      api.getProxyUser().then(console.log)
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
    margin-top: 10px;
  }
  .user-logo {
    max-width: 200px;
    border-radius: 5px;
    transition: all .3s;
  }
  .username {
    font-size: 24px;
    color: #666;
    &::first-letter {
      text-transform: capitalize;
    }
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
  .signature {
    padding: 3px 0;
    font-size: 14px;
    color: #999;
  }
  .photo {
    margin-top: 25px;
    color: #13c2c2;
    font-size: 20px;
    cursor: pointer;
  }
  ul {
    margin-top: 20px;
    .category {
      display: inline-block;
      margin: 5px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      color: #aaa;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        border-color: #f90;
        color: #f90;
        transition: all ease 0.3s;
      }
    }
  }
}
 
</style>
