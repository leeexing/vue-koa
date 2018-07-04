<template>
  <div class="m-photos">
    <h1>相册</h1>
    <main>
      <ul class="category">
        <li :class="{active: activeIndex === 0}">Ins</li>
        <li @click="fetchAlbums">相册簿</li>
        <li @click="$router.push('/leeing/album')">+</li>
      </ul>
      <section class="photo-list">
        <div @click="checkoutAlbum(item)" class="album" v-for="item in albums" :key="item.id">
          <img :src="item.smallPhotosUrl" alt="">
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
      activeIndex: 0,
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
    padding-left: 40px;
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
    // height: 150px;
    padding: 5px;
    background: #fefefe;
    box-shadow: 0 0 2px 3px #ddd;
    cursor: pointer;
    img {
      max-width: 100%;
    }
    h3 {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>
