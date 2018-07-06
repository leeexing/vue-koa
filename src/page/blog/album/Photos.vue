<template>
  <div class="m-photos">
    <h1>相册</h1>
    <main>
      <ul class="category">
        <li :class="{active: activeIndex === 0}">Ins</li>
        <li @click="fetchAlbums" :class="{active: activeIndex === 1}">相册簿</li>
        <li @click="$router.push('/leeing/album')">+</li>
      </ul>
      <section class="photo-list">
        
      </section>
      <section class="photo-list">
        <div @click="checkoutAlbum(item)" class="album" v-for="item in albums" :key="item.id">
          <div class="cover">
            <img :src="item.smallPhotosUrl" alt="">
          </div>
          <h3>{{item.albumName}}</h3>
        </div>
        <p class="no-photos" v-if="!albums">暂时还没有皂片，点击右上角添加您的精彩照片🎭</p>
      </section>
    </main>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'photo',
  data () {
    return {
      activeIndex: 1,
      albums: []
    }
  },
  mounted () {
    this.fetchAlbums()
  },
  methods: {
    fetchAlbums () {
      api.fetchAlbums().then(res => {
        console.log(res)
        this.albums = res.data
      }).catch(err => console.log(err))
    },
    checkoutAlbum (data) {
      console.log(data)
      this.$router.push({name: 'AlbumDetail', query: {id: data._id}})
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.m-photos {
  margin-top: 10px;
  h1 {
    padding: 20px 40px;
    border-left: 4px solid #666;
    font-size: 20px;
  }
  main {
    padding-left: 10px;
    margin-top: 10px;
  }
  .category {
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    li {
      float: left;
      padding: 8px;
      cursor: pointer;
      transition: all .3s;
      &.active {
        color: #40a9ff;
        border: 1px solid #ddd;
        border-bottom: none;
      }
      &:hover {
        background: #36cfc9;
      }
    }
  }
  .photo-list {
    display: flex;
    padding: 15px 0;
    .no-photos {
      margin-top: 100px;
      text-align: center;
    }
  }
  .album {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25%;
    margin-right: 15px;
    height: 150px;
    padding: 5px;
    background: #fefefe;
    border: 1px solid transparent;
    box-shadow: 0 0 2px 3px #ddd;
    cursor: pointer;
    &:hover {
      border-color: silver;
    }
    .cover {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    h3 {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
