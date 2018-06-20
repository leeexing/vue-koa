<template>
  <div id="admin">
    <div class="header">
      <admin-header></admin-header>
    </div>
    <div class="main">
      <v-sidenav></v-sidenav>
      <section class="main-content">
        <div class="content scroll-bar">
          <router-view></router-view>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/header/HeaderAdmin.vue'
import VSidenav from '@/components/sidebar/NavAdmin'
export default {
  name: 'admin',
  data () {
    return {}
  },
  components: {
    AdminHeader,
    VSidenav
  }
}
</script>

<style lang="less">
#admin {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .header {
    height: 60px;
  }
  .main {
    flex: auto;
    display: flex;
    .main-content {
      position: relative;
      flex: 1;
      overflow: hidden;
      .content {
        height: 100%;
        overflow-y: auto;
        transition: all .3s;
      }
    }
  }
}
</style>
