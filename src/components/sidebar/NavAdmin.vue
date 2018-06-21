<template>
  <div class="m-sidenav">
    <!-- <div class="collapse-wrap">
      <el-button class="collapse" type="primary" size="mini" icon="d-arrow-left" @click="isCollapse = !isCollapse"></el-button>
    </div> -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="collapseSideNav"
          router
        >
          <el-menu-item index="/admin">
            <!-- <i class="el-icon-date"></i> -->
            <i class="iconfont icon-home" :style="styleHome"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/admin/user">
            <i class="iconfont icon-yonghuguanli" :style="styleHome"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="iconfont icon-svgwrite" :style="styleHome"></i><span slot="title">博文管理</span></template>
            <el-menu-item index="/admin/article">文章列表</el-menu-item>
            <el-menu-item index="/admin/category">文章分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="iconfont icon-kuozhanshuxing" :style="styleHome"></i><span slot="title">扩展应用</span></template>
            <el-menu-item index="/admin/map">地图应用</el-menu-item>
            <el-menu-item index="/admin/one">One (一个)</el-menu-item>
            <el-menu-item index="/admin/music">Music (网易)</el-menu-item>
            <el-menu-item index="/admin/nsts">NSTS (培训)</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="iconfont icon-zhineng" :style="styleHome"></i><span slot="title">智能聊天</span></template>
            <el-menu-item index="/admin/martina">火星人</el-menu-item>
            <el-menu-item index="/admin/webgl">拯救者</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
          <el-menu-item index="/admin/about">
            <i class="iconfont icon-about-o" :style="styleHome"></i>
            <span slot="title">关于</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'sidebar',
  data () {
    return {
      isCollapse: false,
      styleHome: {
        width: '24px',
        display: 'inline-block',
        'margin-right': '5px',
        'font-size': '18px',
        'text-align': 'center'
      }
    }
  },
  computed: {
    ...mapGetters([
      'collapseSideNav'
    ])
  }
}
</script>

<style lang="less">
.m-sidenav {
  position: relative;
  flex-shrink: 0;
  .tac, .el-col, .el-menu{
    height: 100%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .tac a{
    color: #bfcbd9;
    text-decoration: none;
  }
  .collapse {
    position: absolute;
    top: 0;
    left: 10px;
  }
}

</style>

