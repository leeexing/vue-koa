<template>
  <div class="blog-wrap">
    <div class="m-blog">
      <header-vue></header-vue>
      <main class="blog-content">
        <aside>
          <nav-blog />
        </aside>
        <section>
          <router-view></router-view>
        </section>
      </main>
      <blog-footer />
      <back-top />
    </div>
  </div>
</template>

<script>
  import HeaderVue from '@/components/header/HeaderBlog'
  import NavBlog from '@/components/sidebar/NavBlog'
  import BlogFooter from '@/components/footer/TheFooter'
  import BackTop from '@/components/backToTop'
  export default {
    name: 'index',
    mounted () {
      // 恢复用户保存的数据。FIXME: 使用 vuex-along 后将这个注释掉
      // this.$store.commit('FLASH_STATE')
      // this.fetchMenu()
    },
    components: {
      HeaderVue,
      BackTop,
      NavBlog,
      BlogFooter
    }
  }
</script>

<style lang="scss" scoped>
.blog-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .m-blog {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin: 0 auto;
    padding-top: 80px;
    .blog-content {
      display: flex;
      flex: 1;
      aside {
        flex-basis: 200px;
      }
      section {
        position: relative;
        flex: 1;
        padding: 0 20px;
      }
    }
  }
}
</style>
