<template>
  <div id="music">
    <h2>音乐无极限</h2>
    <div v-for="(item, index) in musicList" :key="item.id" class="music" 
        @click="playMusic(index,
            (item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名')+' - '+strDecode(item.fsong), 
            item.f.split('|')[0],
            item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg')">
        <div class="music-icon">
          <img :src="item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg'" alt="microzz.com">
        </div>
        <div class="music-info">
          <div class="music-name">{{strDecode(item.fsong)}}</div>
          <div class="music-singer">{{item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'}}</div>
          <i v-show="index === playIndex" class="fa fa-music icon-listening"></i>
        </div>
    </div>
    <div v-show="musicList.length" class="tips">没有更多结果了～</div>
    <div v-show="isPlay" class="mini-music">
      <div class="music-img">
        <img :src="audio.musicImgSrc" alt="">
      </div>
      <div class="music-name">
        <p>{{audio.name}}</p>
        <div class="progress">
          <span class="start">{{transformTime(now)}}</span>
          <div class="progressBar">
            <div class="now" :style="{width: (now / duration).toFixed(3) * 100 + '%'}"></div>
          </div>
          <span class="end">{{totalTime}}</span>
        </div>
      </div>
      <div class="music-control">
        <i class="fa fa-play-circle-o" :class="{'fa-play-circle-o' : isPlaying,  'fa-pause': !isPlaying}" @click="play"></i>
      </div>
    </div>
    <!-- 隐藏的audio标签 -->
    <audio v-bind:src="audio.src" v-bind:autoplay="isAutoPlaying" ref="audio"></audio>
  </div>
</template>

<script>
import './music.css'
export default {
  name: 'Music',
  data () {
    return {
      playIndex: 3,
      musicList: [],
      isPlay: true,
      isAutoPlaying: true,
      isPlaying: false,
      now: 0,
      totalTime: 1,
      duration: 1,
      audio: {
        name: '',
        src: '',
        musicImgSrc: '',
        index: 0
      }
    }
  },
  created () {
    // this.$http.get('/appi/music-data').then(data => {
    //   console.log(data)
    // })
    // this.$http.get('/appi/hot').then(data => {
    //   console.info(data)
    // })
    // let url = 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'
    // this.$http.get(url).then(data => console.log(data))

    // this.$http.get('/appi/search/7/周杰伦').then(data => {
    //   console.log(data)
    // })
    this.$http.get('/api/searchMusic?num=10&name=周杰伦').then(data => {
      console.log(data)
      this.musicList = data.data.message.data.song.list
    })
  },
  mounted () {
    this.nativeAudio = document.querySelector('audio')

    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration)
      this.duration = this.nativeAudio.duration
      this.now = this.nativeAudio.currentTime

      setInterval(() => {
        this.now = this.nativeAudio.currentTime
      }, 1000)
    })
  },
  methods: {
    // 解码
    strDecode (str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g, function ($, $1, $2) {
        return String.fromCharCode(parseInt($2, $1 ? 16 : 10))
      })
    },
    playMusic (index, name, src, imgSrc) {
      console.log(index, name, src, imgSrc)
      this.audio.name = name
      this.audio.src = `http://ws.stream.qqmusic.qq.com/${src}.m4a?fromtag=46`
      this.audio.musicImgSrc = imgSrc
      this.playIndex = index
      this.isPlay = true
      this.isPlaying = true
    },
    transformTime (seconds) {
      let m, s
      m = Math.floor(seconds / 60)
      m = m.toString().length === 1 ? ('0' + m) : m
      s = Math.floor(seconds - 60 * m)
      s = s.toString().length === 1 ? ('0' + s) : s
      return m + ':' + s
    },
    play () {
      if (this.isPlaying) {
        this.nativeAudio.pause()
      } else {
        this.nativeAudio.play()
      }
      this.isPlaying = !this.isPlaying
    }
  }
}
</script>

<style lang="less" scoped>
#music {
  padding: 0;
  h2 {
    padding: 10px;
    background: #ccc;
  }
  .tips {
    padding: 10px;
    text-align: center;
  }
  .mini-music {
    display: flex;
    height: 80px;
    background: #b72712;
    .music-img {
      width: 80px;
      height: 80px;
      padding: 1px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .music-name {
      flex: 1;
      align-self: center;
      justify-content: center;
      margin-left: 20px;
      color: #fff;
      p {
        margin-top: 5px;
        text-align: center;
        font-size: 18px;
      }
      .progress {
        display: flex;
        align-items: center;
        width: 50%;
        margin: 0 auto;
        span {
          padding: 10px;
        }
        .progressBar {
          flex: 1;
          height: 10px;
          background: #ccc;
          border-radius: 3px;
          .now {
            height: 100%;
            border-radius: 3px;
            background: #4caf50;
          }
        }
      }
    }
    .music-control {
      width: 50px;
      height: 50px;
      align-self: center;
      margin-right: 20px;
      cursor: pointer;
      i {
        font-size: 50px;
        color: #fff;
      }
    }
  }
}
.music {
  padding-top: 5px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  .music-icon {
    float: left;
    width: 100px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .music-info {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    div {
      margin-top: 10px;
      &.music-name {
        font-size: 18px;
        font-weight: 600;
      }
      &.music-singer {
        color: #999;
      }
    }
    .icon-listening {
      position: absolute;
      top: 60%;
      right: 20px;
      font-size: 20px;
      color: #9c27b0;
    }
  }
}
audio {
  display: none;
}
</style>

