<template>
  <div id="music">
    <div class="search-content">
      <h3 class="title">用户列表</h3>
      <span v-html="htmldata">
        {{htmldata}}
      </span>
      <p class="small">
        <i class="el-icon-edit"></i>
        一些提示
      </p>
      <div class="search-bar">
        <i class="el-icon-search"></i>
        <input type="text" id="search" placeholder="请输入搜索用户名">
        <i class="el-icon-caret-top sort"></i>
        <i class="el-icon-caret-bottom sort"></i>
      </div>
      <ul class="sortable scroll">
        <li>
          <div class="avatar">
            <img src="../../../assets/images/logo1.png" alt="">
          </div>
          <div class="user-info">
            <p class="username">
              勒布朗
              <span class="job-number">工号：20171120308</span>
            </p>
            <div class="train-info">
              <small>当前进度：28%</small>
              <div class="process">
                <div class="process-bar" style="width:28%"></div>
              </div>
            </div>
            <!-- <div class="detail">
                <a href="#" class="check-btn">查看</a>
              </div> -->
          </div>
        </li>
        <li>
          对面 湖水对蓝天信纸对笔尖 小伤疤对创可贴 你在我对面 星辰对山巅 蝴蝶对枕边 一场梦对一双眼 我在你对面 啊 像宇宙的浩瀚无际无边 像平行线上没有过交点
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-12
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
        <li>
          若是归来去: 吸引我的不仅仅是天后的嗓音，还有亘古不变的自拍封面
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-12
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
        <li>
          若是归来去: 吸引我的不仅仅是天后的嗓音，还有亘古不变的自拍封面
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-12
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
        <li>
          若是归来去: 吸引我的不仅仅是天后的嗓音，还有亘古不变的自拍封面
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-12
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
        <li>
          若是归来去: 吸引我的不仅仅是天后的嗓音，还有亘古不变的自拍封面
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-12
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
        <li>
          若是归来去: 吸引我的不仅仅是天后的嗓音，还有亘古不变的自拍封面
          <div class="detail">
            <i class="el-icon-time"></i>
            2017-09-13
            <a href="#" class="check-btn">查看</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-content">
      <div class="show-box">
        <div class="title">
          <h1>这里是用户信息的标题</h1>
        </div>
        <div class="info-content">
          <div class="timeline">
            <div class="timeline-icon">
              <i class="el-icon-information"></i>
            </div>
            <div class="timeline-content">
              <h2>考卷名称 -- 宝贝A计划</h2>
              <p>类型：理论</p>
              <p>状态：完成，未完成</p>
              <a href="#" class="btn-info">更多</a>
            </div>
          </div>
          <div class="timeline">
            <div class="timeline-icon">
              <i class="el-icon-star-on"></i>
            </div>
            <div class="timeline-content">
              <h2>课件名称 -- CT判图课件</h2>
              <p>类型：CT</p>
              <div class="process-info">
                <small>学习进度：28%</small>
                <div class="process">
                  <div class="process-bar" style="width:28%"></div>
                </div>
              </div>
              <a href="#" class="btn-info">更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './music.css'
export default {
  name: 'Nsts',
  data () {
    return {
      htmldata: '<code>45</code>'
    }
  }
}
</script>

<style lang="less" scoped>

</style>

