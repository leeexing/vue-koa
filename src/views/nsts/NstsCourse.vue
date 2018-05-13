<template>
  <div class="nsts">
    <!-- 课件头部信息 -->
    <header class="course-header">
      <i class="el-icon-caret-top"></i>
      <h1 class="course-name">D2前端技术论坛</h1>
    </header>
    <!-- 课件学习区 -->
    <div class="study-main">
      <div class="box-wrap">
        <!-- 视频学习 -->
        <div class="video-box">
          <video src="http://files.anjianba.cn/fileroot/01/201708/16/01/89e7e1db78c7c8afbb3a9d08e4f6be75小小智慧树.mp4"
                    class="j-video vjs" preload="auto"
                    ></video>
          <div class="vjs-control-bar">
            <!-- 播放按钮、时间 -->
            <div class="left-bar">
              <i class="fa fa-play btn-play j-play-control"></i>
              <div class="time-info">
                <span class="current-time">10:31</span>
                <span class="divider">/</span>
                <span class="duration">13:55</span>
              </div>
            </div>
            <!-- 音量、速度、全屏 -->
            <div class="right-bar">
              <div class="volume-control">
                <i class="fa fa-volume-up btn-volume"></i>
                <div class="volume-menu">
                  <div class="volume-bar"></div>
                </div>
              </div>
              <div class="play-rate">
                <span class="playrate-value">1.75x</span>
                <ul class="palyrate-menu">
                  <li>2.0x</li>
                  <li class="active">1.75x</li>
                  <li>1.5x</li>
                  <li>1.25x</li>
                  <li>1.0x</li>
                </ul>
              </div>
              <i class="fa fa-square-o full-screen"></i>
            </div>
            <!-- 播放进度条 -->
            <div class="process-control">
              <div class="play-process"></div>
            </div>
          </div>
          <div class="play-pause">
            <i class="fa fa-play-circle"></i>
          </div>
        </div>
        <!-- 文档学习 -->
        <div class="doc-box">
          <div class="doc-detail">
            <h3>我就是我，不一样的稳当</h3>
          </div>
        </div>
        <!-- 图片学习 -->
        <div class="img-box">
          <div class="img-detail-container clearfix">
            <h3 class="img-head">什么是CSS预处理器</h3>
            <ul>
              <li>图像呢名称</li>
              <li>图像类别</li>
              <li>适用级别</li>
              <li>图像描述</li>
            </ul>
          </div>
          <div class="img-show">
            <div class="map">
              <img src="../../assets/logo.png" alt="您好">
            </div>
            <div class="img-operate">
              <i class="fa fa-arrow-circle-left"></i>
              <span>
                <span class="cur-index">1</span>
                /
                <span class="total-index">5</span>
              </span>
              <i class="fa fa-arrow-circle-right"></i>
            </div>
          </div>
        </div>
        <!-- 提示下一个课件播放 -->
        <div class="next-box"></div>
      </div>
      <div class="section-list">
        <div class="operator">
          <ul>
            <li class="op chapter">章节</li>
            <li class="op">笔记</li>
          </ul>
        </div>
        <div class="nano">
          <h3>诺大的世界还是依旧这里只剩下我</h3>
          <ul>
            <li class="sec-title">第1章 微信小程序解决方案</li>
            <li>
              <a href="#">
                <i>
                  正在学习
                  <em class="el-icon-time"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                1-1 微信小程序解决方案(11:12)
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                   <em class="el-icon-information nolearn"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                1-2 微信小程序解决方案(08:09)
              </a>
            </li>
          </ul>
          <ul>
            <li class="sec-title">第2章 Web3D & AR 在天猫爽11互动中</li>
            <li>
              <a href="#">
                <i>
                  <em class="el-icon-information nolearn"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                2-1 Web3D & AR 在天猫爽11互动中(32:55)
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                   <em class="el-icon-information nolearn"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                2-2 李慧宇是男声 我是女声 你们不要再认错人了 我很尴尬(12:55)
              </a>
            </li>
          </ul>
          <ul>
            <li class="sec-title">第3章 微信小程序解决方案</li>
            <li>
              <a href="#">
                <i>
                  <em class="el-icon-information nolearn"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                3-1 争吵太多我们感觉好累(10:12)
              </a>
            </li>
            <li>
              <a href="#">
                <i>
                   <em class="el-icon-information nolearn"></em>
                </i>
                <em class="el-icon-caret-right"></em>
                3-2 咖啡店熟悉的座位(15:45)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 课件评论区 -->
    <div class="course-subcontainer">
      <ul class="remark-menu clearfix">
        <li class="active">评论</li>
        <li>问答</li>
        <li>笔记</li>
      </ul>
      <div class="comment-content">
        <div class="comment-edit">
          <a href="#" class="user-avata">
            <img src="../../assets/images/logo1.png" alt="您好">
          </a>
          <div>
            <div class="edit-wrap clearfix">
              <textarea placeholder="扯淡、吐槽、表扬、鼓励……想说啥就说啥！"></textarea>
              <p><span class="j-limit">9</span>/300</p>
            </div>
            <a href="#" class="publish">发表评论</a>
          </div>
        </div>
        <ul class="comment-list clearfix">
          <li>
            <img src="../../assets/images/logo1.png" alt="您好">
            <div class="comment-detail">
              <h3>木大圣贤</h3>
              <p>折《吉姆餐厅》的实体CD里面内页专门写了《家乡》这首歌改编自《breeze》，
                还特地致敬了歌手，作曲也写了原创。
                但网易云里面大家好像发现了新大陆一样，这……只能怪赵雷不爱说话，不刷微博了！
                还有就是有些配歌词的，作曲填他只能说无意间给他挖坑</p>
              <div>
                <span>时间：2017-9-28</span>
                <span class="like"><i class="fa fa-thumbs-up"></i><span>2</span></span>
              </div>
            </div>
          </li>
          <li>
            <img src="../../assets/images/logo1.png" alt="您好">
            <div class="comment-detail">
              <h3>木大圣贤</h3>
              <p>折《吉姆餐厅》的实体CD里面内页专门写了《家乡》这首歌改编自《breeze》，
                还特地致敬了歌手，作曲也写了原创。
                但网易云里面大家好像发现了新大陆一样，这……只能怪赵雷不爱说话，不刷微博了！
                还有就是有些配歌词的，作曲填他只能说无意间给他挖坑</p>
              <div>
                <span>时间：2017-9-28</span>
                <span class="like"><i class="fa fa-thumbs-up"></i><span>2</span></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import './nsts.css'
export default {
  name: 'nsts'
}
</script>

<style lang="less" scoped>
//
</style>

