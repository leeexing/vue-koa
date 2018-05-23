<template>
  <div class="m-header">
    <h3 class="blogName" @click="$router.push('/leeing')">{{blogName}}</h3>
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
  import api from '@/api'
  import {removeToekn} from '@/util/auth'
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
        this.$confirm('是否确定退出博客？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.logout().then(res => {
            console.log(res)
            if (res.success) {
              removeToekn()
              this.$router.push('/')
            }
          }).catch(err => {
            console.error(err)
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
    .blogName {
      color: #f90;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
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
