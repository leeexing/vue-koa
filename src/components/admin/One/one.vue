<template>
  <div id="one">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="one-wrap">
      <div class="logo">
        <a href="http://www.wufazhuce.com/">
          <img src="./one-logo.png" alt="logo"> 
        </a>
      </div>
      <div class="content-one">
        <div class="main">
           <el-row>
            <el-col :span="16" class="mainc"> 
              <div class="info">
                <div class="img-info">
                   <img :src="renderData.img_url" alt="renderData.pic_info">
                  <p class="title">{{renderData.title}}</p>
                  <a href="#" class="prev">
                    <i @click="prev" class="el-icon-arrow-left"></i>
                  </a>
                  <a href="#" class="next">
                    <i @click="next" class="el-icon-arrow-right"></i>
                  </a> 
                </div>
                <div class="foot-info">
                  <div class="forward">
                    <div class="content">
                      <p>{{renderData.forward}}</p>
                    </div>
                    <div class="weather">
                      <p>{{renderData.volume}}</p>
                      <p>{{date[2]}}</p>
                      <p>{{date[1]}} {{date[0]}}</p>
                    </div>
                  </div>
                  <div class="slider">
                      <span v-for="(item, i) in 7" :key="item.id" :class="{active: index === i}" @click="swiper(i)"></span>
                  </div>
                </div>
              </div>
             </el-col>
            <el-col :span="8" class="sidec">
              <div class="artical">
                <p class="title">ONE 文章</p>
                <div class="corriente">
                  <p class="volume">VOL.{{menu.vol}}</p>
                  <p class="one-artical">
                    <a href="#">{{menu.list[0].title}}</a>
                    <small> - 赫恩曼妮</small>
                  </p>
                </div>
                <ul class="pasado">
                  <li v-for="(item, index) in menu.list" :key="item.id">
                    <span>VOL.{{+menu.vol - index}}</span>
                    <a @click="saveEssayId(item.content_id)">{{item.title}}</a>
                  </li>
                </ul>
              </div>
              <div class="music">
                <p class="title">ONE 音乐</p>
                <p class="mymusic"><router-link to="/myadmin/one/music">去你的音乐音乐</router-link></p>
                <ul class="music-ul">
                  <li class="music-list" v-for="item in musicData" :key="item.id">
                    <div class="cover">
                      <img :src="item.img_url" alt="">
                    </div>
                    <div class="info">
                      <p class="music-title"><a :href="item.share_url" target="_blank">{{item.forward}}</a></p>
                      <p class="forward">{{item.subtitle.split(':')[1]}} | {{item.author.user_name}}</p>
                    </div>
                  </li>
                  <li class="music-more">
                    <i v-show="moreShow" class="el-icon-caret-bottom" @click="getMore"></i>
                    <i v-show="!moreShow" class="el-icon-caret-top" @click="packUpMore"></i>
                  </li>
                </ul>
              </div>
            </el-col> 
           </el-row> 
        </div>
      </div>
      <p class="one-foot">
        App<span>「一个」</span>
      </p>
    </div>
  </div>
</template>

<script>
import oneServer from '../../../util/server'
import BreadCrumb from '@/components/admin/breadcrumb'
export default {
  name: 'home',
  data () {
    return {
      oneData: [
        {
          content: {
            img_url: '../../../../static/one.png'
          },
          date: [0, 0, 0],
          menu: {
            vol: 0,
            list: [
              {
                title: 0
              }
            ]
          }
        }
      ],
      musicData: [
        {
          img_url: '',
          forward: '',
          subtitle: 'a:Music',
          author: {user_name: 'One'}
        }
      ],
      musicLists: {},
      moreShow: true,
      index: 0,
      breadinfo: [{name: '扩展应用'}, {name: '一个'}]
    }
  },
  created () {
    let that = this
    let dateArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    async function getData () {
      let ids = await oneServer.getId(that)
      ids = ids.map(item => +item).slice(0, 7)
      // 首页左侧图文数据
      let lists = await oneServer.getAllLists(that, ids)
      // 音乐列表数据
      that.musicLists = await oneServer.getMusicLists(that)
      that.musicData = that.musicLists.slice(0, 6)
      let data = lists.map(item => {
        let data = item.data.data
        let date = data.date.slice(0, 10).split('-').map((item, index) => {
          if (index === 0) {
            return item
          }
          if (index === 1) {
            return dateArr[+item - 1]
          }
          if (index === 2) {
            return +item
          }
        })
        return {
          date,
          content: data.content_list[0],
          id: data.id,
          weather: data.weather,
          menu: data.menu
        }
      })
      // console.log(data)
      that.oneData = data
    }
    getData()
  },
  mounted () {
    // setInterval(() => {
    //   this.index < 6 ? this.index++ : this.index = 0
    // }, 5000)
  },
  computed: {
    renderData () {
      return this.oneData[this.index].content
    },
    date () {
      return this.oneData[this.index].date
    },
    menu () {
      return this.oneData[0].menu
    }
  },
  methods: {
    prev () {
      this.index > 0 ? this.index-- : 0
    },
    next () {
      this.index < 6 ? this.index++ : 6
    },
    swiper (index) {
      this.index = index
    },
    saveEssayId (value) {
      console.log(value)
      this.$store.dispatch('setOneEssayId', value)
      this.$router.push('/myadmin/one/essay')
    },
    getMore () {
      // this.moreShow = false
      this.musicData = this.musicLists
    },
    packUpMore () {
      this.moreShow = false
      this.musicData = this.musicLists.slice(0, 6)
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
#one {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .one-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logo {
      height: 50px;
      background: #01aef0;
      text-align: center;
      margin-bottom: 10px;
    }
    .one-foot {
      height: 36px;
      line-height: 36px;
      background-color: #222;
      color: #fff;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      span {
        color: #cddc39;
      }
    }
    .content-one {
      padding-bottom: 10px;
      .main {
        width: 1000px;
        margin: 0 auto;
        .el-row {
          width: 100%;
        }
      }
      .img-info {
        position: relative;
        img {
          width: 100%;
        }
        .title {
          padding: 2px 0;
          background: #333;
          color: #fff;
          font-size: 14px;
          text-align: center;
        }
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          bottom: 0;
          color: #ddd;
          font-size: 20px;
          &.prev {
            left: 0;
            width: 80px;
          }
          &.next {
            right: 0;
            width: 80px;
          }
          &:hover i {
            color: #ddd;
          }
          i {
            font-size: 32px;
            color: #999;
          }
        }
      }
      .foot-info {
        display: flex;
        height: 143px;
        flex-direction: column;
        .forward {
          flex: 1;
          display: flex;
          background: #d6d6d6;
          .content {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 0 20px;
            p {
              align-self: center;
              line-height: 24px;
            }
          }
          .weather {
            display: flex;
            padding: 5px 0;
            flex-direction: column;
            justify-content: space-around;
            flex-basis: 100px;
            background: #f2f2f2;
            p {
              font-size: 14px;
              text-align: center;
            }
            p:nth-child(2) {
              height: 60px;
              line-height: 60px;
              font-family: '微软雅黑';
              font-size: 60px;
              font-weight: 600;
            }
          }
        }
        .slider {
          height: 23px;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            width: 9px;
            height: 9px;
            margin-left: 15px;
            border: 1px solid #eee;
            border-radius: 50%;
            cursor: pointer;
            &.active, &:hover {
              background: #fff;
              transition: all 0.3s ease;
            }
          }
        }
      }
    }
  }
}
.sidec {
  padding-left: 10px;
  .artical {
    background-color: #f6f6f6;
    .title {
      margin-bottom: 10px;
      padding: 5px 10px;
      background-color: #01aef0;
      font-size: 18px;
      line-height: 32px;
      font-weight: 400;
      color: #fff;
    }
    .corriente {
      padding-left: 10px;
      font-family: "Microsoft YaHei";
      .volume {
        font-size: 12px;
        margin-bottom: 5px;
      }
      .one-artical {
        padding: 15px 0;
        color: #428bca;
        &:hover {
          text-decoration: underline;
          color: #2a6496;
          a {
            color: #2a6496;
          }
        }
        a {
          color: #428bca;
          font-size: 18px;
        }
      }
    }
    .pasado {
      padding-bottom: 10px;
      margin-bottom: 10px;
      li {
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
          margin-right: 5px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .music {
    background-color: #f6f6f6;
    .mymusic {
      padding: 5px 10px;
      a {
        color: #428bca;
        &:hover {
          text-decoration: underline;
          color: #2a6496;
        }
      }
    }
    .title {
      margin-bottom: 10px;
      padding: 5px 10px;
      background-color: #01aef0;
      font-size: 18px;
      line-height: 32px;
      font-weight: 400;
      color: #fff;
    }
    .music-ul {
      padding: 10px 0;
      .music-list {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        height: 80px;
        border-bottom: 1px solid #ddd;
        .cover {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100%;
          }
        }
        .info {
          width: 75%;
          p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .music-title {
            height: 32px;
            line-height: 32px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .forward {
            line-height: 24px;
            font-size: 14px;
            color: #999;
          }
        }
      }
      .music-more {
        padding-top: 5px;
        text-align: center;
        i {
          color: #01aef0;
          cursor: pointer;
          opacity: .5;
          &:hover {
            opacity: 1;
            transition: all .3s ease;
          }
        }
      }
    }
  }
}
</style>

