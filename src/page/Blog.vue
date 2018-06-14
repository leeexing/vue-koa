<template>
  <div class="m-blog">
    <header-vue></header-vue>
    <main class="content">
      <aside>
        <nav-blog />
      </aside>
      <section>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </section>
    </main>
    <blog-footer />
    <back-top />
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

<style lang="scss">
.m-blog {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 80px;
  .content {
    display: flex;
    aside {
      flex-basis: 200px;
    }
    section {
      flex: 1;
      padding: 0 20px;
    }
  }
}
</style>
