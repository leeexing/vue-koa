<template>
  <div class="m-about">
    <header class="header">
      <div class="logo">Leeing</div>
      <div class="nav">
        <a href="#" class="music">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
        <a href="#" class="skip">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </header>
    <div class="bg-picture">
      <canvas id="canvas"></canvas>
    </div>
    <div class="container">
      <div class="god">
        <h1 class="motto">保持简单和稳定</h1>
        <h3 class="about-me">ABOUT ME</h3>
        <div class="my-status">
          <h3 class="title">我的动态</h3>
          <div class="new-list">
            <ul>
              <li>
                <p>定义模块的层次结构就像在文件系统上建立目录结构一样容易</p>
                <time>一周以前</time>
              </li>
              <li>
                <p>不知道去拿来gall社么额</p>
                <time>半个月以前</time>
              </li>
              <li>
                <p>吃的还不错文字有点少暗室逢灯金佛杀菌灯佛萨达</p>
                <time>三个月以前</time>
              </li>
              <li>
                <p>看了一部电影法撒旦飞风尚大典三</p>
                <time>半年以前</time>
              </li>
              <li>
                <p>项目精湛的有点慢法撒旦飞似懂非懂您好 好就回复</p>
                <time>一年以前</time>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section class="about">
        <div class="info">
          <a href="#" class="avatar">
            <img src="../../../assets/images/avatar.png" alt="avatar">
          </a>
          <ul class="contact ul-wrap">
            <li>
              <i class="icon iconfont icon-email"></i>
            </li>
            <li>
              <i class="icon iconfont icon-github"></i>
            </li>
            <li>
              <i class="icon iconfont icon-weixin"></i>
            </li>
            <li>
              <i class="icon iconfont icon-sina"></i>
            </li>
            <li>
              <i class="icon iconfont icon-netease"></i>
            </li>
          </ul>
          <a href="#" class="resume" @click="show">我的简历</a>
        </div>
        <div class="info">
          <h3>BELEIVE</h3>
          <hr>
          <p class="wel-info">定义模块的层次结构就像在文件系统上建立目录结构一样容易定义模块的层次结构就像在文件系统上建立目录结构一样容易</p>
        </div>
        <div class="info">
          <h3>ENJOY</h3>
          <hr>
          <ul class="hobby ul-wrap">
            <li><i class="icon iconfont icon-lanqiu"></i></li>
            <li><i class="icon iconfont icon-music"></i></li>
            <li><i class="icon iconfont icon-film"></i></li>
            <li><i class="icon iconfont icon-code"></i></li>
          </ul>
        </div>
        <div class="info">
          <h3>PROGRESS</h3>
          <hr>
          <ul class="experience">
            <li>
              <time>2016.6</time>
              <div>
                <p>同方威视技术股份有限公司</p>
                <p>web开发工程师</p>
              </div>
            </li>
            <li>
              <time>2016.2</time>
              <div>
                <p>北京恒昌利通投资管理有限公司</p>
                <p>前端开发工程师</p>
              </div>
            </li>
            <li>
              <time>2015.7</time>
              <div>
                <p>北京亚控科技发展有限公司</p>
                <p>产品研发工程师</p>
              </div>
            </li>
            <li>
              <time>2012.9</time>
              <div>
                <p>湖南大学 -- 硕士</p>
                <p>电子科学与技术</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="info">
          <h3>SKILLS</h3>
          <hr>
          <ul class="skill ul-wrap">
            <li title="Html5">
              <div class="detail">
                <div class="skill-info">
                  <span class="power">80%</span>
                </div>
              </div>
              <i class="icon iconfont icon-html5"></i>
              <p class="skill-name">Html5</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">70%</span>
                </div>
              </div>
              <i class="icon iconfont icon-js"></i>
              <p class="skill-name">Javascript</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">70%</span>
                </div>
              </div>
              <i class="icon iconfont icon-vue"></i>
              <p class="skill-name">Vue</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">50%</span>
                </div>
              </div>
              <i class="icon iconfont icon-react"></i>
              <p class="skill-name">React</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">60%</span>
                </div>
              </div>
              <i class="icon iconfont icon-nodejs"></i>
              <p class="skill-name">Nodejs</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">75%</span>
                </div>
              </div>
              <i class="icon iconfont icon-python"></i>
              <p class="skill-name">Python</p>
            </li>
            <li>
              <div class="detail">
                <div class="skill-info">
                  <span class="power">70%</span>
                </div>
              </div>
              <i class="icon iconfont icon-mongodb"></i>
              <p class="skill-name">Mongodb</p>
            </li>
          </ul>
        </div>
      </section>
      <footer class="footer">
        <div>
          <a href="#"><i class="icon iconfont icon-email1"></i></a>
          <a href="#"><i class="icon iconfont icon-weixin"></i></a>
          <a href="#"><i class="icon iconfont icon-github1"></i></a>
          <a href="#"><i class="icon iconfont icon-zhihu1"></i></a>
          <a href="#"><i class="icon iconfont icon-jianshu1"></i></a>
        </div>
        <p>版权左右 2017 Leeing。保留所有版权，欢迎多多交流</p>
        <p>powered by python, Developed by Leeing</p>
      </footer>
    </div>
  </div>
</template>
<script>
import './about.css'
export default {
  name: 'about',
  data () {
    return {
      myresume: '床前明月光，&lt;br/&gt;疑是地上霜。&lt;br/&gt;举头望明月，&lt;br/&gt;低头思故乡。'
    }
  },
  methods: {
    show () {
      let that = this
      let divTyping = this.$refs.output
      let i = 0
      function typing () {
        if (i <= that.myresume.length) {
          divTyping.innerHTML = that.myresume.slice(0, i++) + '_'
          setTimeout(typing, 300)
        } else {
          divTyping.innerHTML = that.myresume
        }
      }
      typing()
    }
  }
}
</script>
<style lang="less" scoped>
// .m-about {
//   position: fixed;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0,0,0,.9);
//   z-index: 9999;
//   overflow-y: scroll;
//   color: #fff;
//   text-align: center;
//   .header {
//     position: absolute;
//     top: 0;
//     left: 0;
//     display: flex;
//     justify-content: space-between;
//     height: 50px;
//     width: 100%;
//     padding: 0 50px;
//     color: #ed0a75;
//     .music {
//       span {
//         width: 5px;
//         height: 36px;
//         margin-left: 5px;
//         background-color: #ed0a75;
//       }
//     }
//   }
//   .bg-picture {
//     display: none;
//   }
//   .god {
//     .motto {
//       margin-bottom: 15px;
//       line-height: 1.5;
//       font-size: 48px;
//       font-weight: 700;
//       letter-spacing: 5px;
//     }
//     .about-me {
//       font-size: 2rem;
//       letter-spacing: 5px;
//       line-height: 1.5;
//     }
//     margin-top: 10%;
//     text-align: center;
//   }
//   .about {
//     margin-top: 50px;
//     .info {
//       max-width: 60%;
//       margin: 0 auto 80px;
//       .avatar {
//         display: inline-block;
//         width: 100px;
//         height: 100px;
//         border: 2px solid #ddd;
//         border-radius: 50%;
//         img {
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//         }
//       }
//       h3 {
//         margin-bottom: 10px;
//         font-size: 22px;
//       }
//       hr {
//         height: 2px;
//         width: 50px;
//         margin: 15px auto 30px;
//         background-color: rgba(0,0,0,.6);
//       }
//       p {
//         line-height: 20px;
//       }
//       ul {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         padding: 10px;
//         &.contact {
//           li {
//             // width: 48px;
//             // height: 48px;
//             margin: 2px;
//           }
//         }
//       }
//     }
//   }
// }
</style>
