<template>
  <div class="admin-header">
    <el-menu
      :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="rgb(84, 92, 100)"
    >
      <el-menu-item class="userlogo" index="1"><img src="../../assets/images/logo1.png" alt=""></el-menu-item>
      <el-menu-item class="userlogo" index="2">아름다운 여신</el-menu-item>
      <el-submenu class="logout" index="3">
        <template slot="title">리 아성</template>
        <el-menu-item index="3-2">首页</el-menu-item>
        <el-menu-item index="3-3">其他</el-menu-item>
        <el-menu-item index="3-4"><a href="https://github.com/leeexing" target="_blank">我的github</a></el-menu-item>
        <el-menu-item index="3-1">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import api from '@/api'
import {removeToekn} from '@/util/auth'
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$store.dispatch('toggleSidenav')
          break
        case '3-1':
          this.logout()
          break
        case '3-2':
          this.$router.push('/leeing')
          break
        default:
          break
      }
    },
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

<style lang="less">
.admin-header {
  .userlogo {
    border: none;
    &:hover {
      border: none;
    }
    img {
      width: 40px;
    }
  }
  .logout {
    float: right;
    margin-right: 30px;
    .el-menu, .el-menu-item {
      min-width: 100%;
    }

  }
}
.el-menu-item {
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
