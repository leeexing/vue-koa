<template>
  <div class="m-header">
    <h3>{{blogName}}</h3>
    <!-- <p class="logout"><a href="#" @click="logout">给我一首歌的时间</a></p> -->
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        菜单<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="logout">退出</a></el-dropdown-item>
        <el-dropdown-item v-if="isAdmin"><a class="logoutBtn" href="/admin">后台管理</a></el-dropdown-item>
        <el-dropdown-item><a href="/nsts">NSTS</a></el-dropdown-item>
        <el-dropdown-item divided>设置</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'leeHeader',
    data () {
      return {
        blogName: 'LEEING'
      }
    },
    computed: {
      ...mapGetters([
        'isAdmin'
      ])
    },
    methods: {
      logout () {
        let that = this
        this.$confirm('是否确定退出博客？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/auth/logout', null)
            .then(ret => {
              console.log(ret)
              if (ret.data.success) {
                sessionStorage.setItem('vue-koa-token', '')
                that.$router.push('/login')
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-header {
    position: fixed;
    top:0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 0 30px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 9;
    h3 {
      color: #f90;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .el-dropdown-menu__item {
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
</style>
