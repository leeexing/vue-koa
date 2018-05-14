<template>
  <div id="one" ref="one">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="one-wrap">
      <div class="logo">
        <a href="http://www.wufazhuce.com/">
          <img src="./one-logo.png" alt="logo"> 
        </a>
      </div>
      <div class="content-essay">
        <p class="guide-word">{{essay.guide_word}}</p>
        <h1 class="title">{{essay.hp_title}}</h1>
        <p class="author">作者/{{essay.hp_author}}</p>
        <section class="hp-content">
          <div v-html="essay.hp_content"></div>
        </section>
        <p class="author-introduce">
          <a :href="'http://' + author_intro[1]">{{author_intro[0]}}</a>
        </p>
      </div>
      <p class="one-foot">
        App「一个」
      </p>
      <div class="top" v-show="topShow">
        <el-button type="primary" icon="caret-top" @click="top"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      breadinfo: [{name: '扩展应用'}, {name: '一个', path: '/myadmin/one'}, {name: '文章'}],
      essay: {
        //
      },
      author_intro: [],
      topShow: false
    }
  },
  created () {
    let id = this.$store.state.oneEssayId
    this.$http.get(`http://v3.wufazhuce.com:8000/api/essay/${id}`)
      .then(ret => {
        console.log(ret)
        this.essay = ret.data.data
        this.author_intro = this.essay.hp_author_introduce.replace(/\s?[（）]\s?/g, '').split(' ')
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
    let one = document.getElementById('one').parentElement
    let that = this
    one.addEventListener('scroll', function (e) {
      if (e.target.scrollTop && e.target.scrollTop > 150) {
        that.topShow = true
      } else {
        that.topShow = false
      }
    }, false)
  },
  computed: {
    ...mapGetters([
      'oneEssayId'
    ])
  },
  methods: {
    top () {
      let one = document.getElementById('one').parentElement
      if (one.scrollTop > 0) {
        one.scrollTop = 0
      }
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less">
#one {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .top {
    position: fixed;
    top: 700px;
    right: 40px;
    button {
      padding: 10px;
      border-radius: 50%;
      opacity: .5;
      &:hover {
        opacity: 1;
        transition: all .3s;
      }
    }
  }
  .one-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .logo {
      height: 50px;
      background: #01aef0;
      text-align: center;
      margin-bottom: 10px;
    }
    .content-essay {
      padding: 10px 30px;
      font-family: '宋体';
      .guide-word {
        padding: 30px;
        font-size: 14px;
        color: #888;
      }
      .title {
        padding: 20px 0;
      }
      .author {
        font-size: 14px;
        margin-bottom: 20px;
      }
      .author-introduce {
        padding: 20px 0;
        font-style: italic;
      }
      .hp-content {
        p {
          margin-top: 20px;
          font-size: 18px;
        }
      }
    }
    .one-foot {
      height: 36px;
      line-height: 36px;
      background-color: #222;
      color: #fff;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>

