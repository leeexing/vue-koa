<template>
  <div class="keyboard">
    <header>
      <h3>键盘侠</h3>
    </header>
    <footer class="m-footer">
      <div class="keyboard">
        <div class="angle">
          <div class="angle-wrap">
            <div class="dr-amplify">
                <p><span class="j-dr-zoomindex">10.0</span> x</p>
            </div>
            <div class="dr-angles j-angles">
                <a class="active">视角一</a>
                <a>视角二</a>
            </div>
          </div>
          <div class="entity-wrap j-entity-wrap">
            <a>实物图</a>
          </div>
        </div>
        <div class="opr opr-1 j-tools">
          <div>
            <div class="level-1">
              <a class="dr-btn colours active" data-group="c" data-index="1" data-defaultindex="1" data-tag="default" title="真彩色"></a>
              <a class="dr-btn ms" data-group="c" data-index="2" data-defaultindex="1" data-tag="ms" title="无机物剔除"></a>
              <a class="dr-btn os" data-group="c" data-index="3" data-defaultindex="1" data-tag="os" title="有机物剔除"></a>
              <a class="dr-btn bw" data-group="c" data-index="0" data-defaultindex="1" data-tag="blackwhite" title="灰色显示"></a>
            </div>
            <div class="level-2">
              <a class="dr-btn gen" data-group="a" data-index="0" data-defaultindex="-1" data-tag="super" title="超级增强"></a>
              <a class="dr-btn absor-minus" data-group="absor" data-absor="5" title="可吸收率(-)"></a>
              <a class="dr-btn absor-plus" data-group="absor" data-absor="5" title="可吸收率(+)"></a>
              <a class="dr-btn hi" data-group="b" data-index="0" data-defaultindex="-1" data-tag="superpenetrate" title="超级穿透"></a>
            </div>
          </div>
          <div class="level-3">
            <a class="l-btn f1"></a>
            <a class="l-btn f2"></a>
            <a class="l-btn f3"></a>
          </div>
        </div>
        <div class="opr opr-2">
          <div>
            <div class="level-1">
              <a href="" class="d-btn btn-8"></a>
              <a href="" class="d-btn btn-9"></a>
              <a href="" class="d-btn btn-10"></a>
              <a href="" class="d-btn btn-11"></a>
            </div>
            <div class="level-2">
              <a href="" class="d-btn btn-14"></a>
              <a href="" class="d-btn btn-15"></a>
              <a href="" class="d-btn btn-16"></a>
              <a href="" class="d-btn btn-17"></a>
            </div>
            <div class="level-3">
              <a href="" class="l-btn btn-19"></a>
              <a href="" class="l-btn btn-20"></a>
            </div>
            <div class="level-4">
              <a href="" class="d-btn btn-22"></a>
              <a href="" class="l-btn btn-21"></a>
              <a href="" class="d-btn btn-23"></a>
            </div>
          </div>
          <div>
            <div>
              <a href="" class="d-btn btn-12"></a>
              <a href="" class="d-btn btn-13"></a>
            </div>
            <div>
              <a href="" class="l-btn btn-18"></a>
            </div>
          </div>
        </div>
        <div class="opr opr-3">
          <div>
            <div class="level-1">
              <a href="" class="d-btn btn-24"></a>
              <a href="" class="d-btn btn-25"></a>
              <a href="" class="d-btn btn-26"></a>
            </div>
            <div class="level-2">
              <a href="" class="d-btn btn-27"></a>
              <a href="" class="d-btn btn-28"></a>
              <a href="" class="d-btn btn-29"></a>
            </div>
            <div class="level-3">
              <a href="" class="d-btn btn-30"></a>
              <a href="" class="d-btn btn-31"></a>
              <a href="" class="d-btn btn-32"></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
header {
  padding: 15px;
  background: #333;
  h3 {
    color: #fff;
  }
}
.m-footer {
    background: rgb(122,216,228);
    overflow-x: auto;
    overflow-y: hidden;
    .keyboard {
      display:flex;
      justify-content: space-between;
      width: 1150px;
      margin: 0 auto;
      padding: 10px;
    }
    .angle {
      display: flex;
      flex-direction: column;
      width: 65px;
      a {
        display: inline-block;
        margin-top: 15px;
        padding: 5px 10px;
        border-radius: 3px;
        background: #1890ff;
        color: #fff;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        &:hover, &.active {
          background: rgb(254,64,128);
        }
      }
      .dr-amplify {
        margin-bottom: 20px;
        color: #fff;
        font-size: 14px;
        text-align: center;
        p {
          &::before {
            position: relative;
            bottom: -4px;
            content:'';
            display: inline-block;
            width: 21px;
            height: 20px;
            background:url('/static/3D/images/DR/default/amplify.png');
          }
          span {
            margin-left: 3px;
          }
        }
      }
      .dr-angles {
        display: flex;
        flex-direction: column
      }
      .entity-wrap {
        @extend .dr-angles;
      }
    }
    .opr-1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .level-1, .level-2 {
        display: flex;
        justify-content: space-between;
      }
      a {
        cursor: pointer;
        &:hover {
            opacity: .8;
          }
          &.active {
            box-shadow: 0 0 2px 2px #f90;
          }
      }
    }
    .opr-2 {
      display: flex;
      .level-3, .level-4 {
        display: flex;
        justify-content: space-between;
      }
    }
    .opr-3 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dr-btn, .d-btn, .l-btn{
      display: inline-block;
      width: 44px;
      height: 44px;
      margin: 10px 10px 0;
      -webkit-user-select:none;
    }
    .l-btn {
      width: 102px;
    }
    .opr {
      padding-bottom: 10px;
      border: 1px solid rgb(114,204,223);
      -webkit-user-select:none;
      .colours {
        background:url('/static/3D/images/DR/default/1.png');
      }
      .ms {
        background:url('/static/3D/images/DR/default/2.png');
      }
      .os {
        background:url('/static/3D/images/dr/default/3.png');
      }
      .bw {
        background:url('/static/3D/images/dr/default/4.png');
      }
      .gen {
        background:url('/static/3D/images/dr/default/5.png');
      }
      .absor-minus {
        background:url('/static/3D/images/dr/default/6-.png');
        &:hover{
            background:url('/static/3D/images/dr/hover/6-.png');
        }
        &.active {
            background:url('/static/3D/images/dr/click/6-.png');
        }
      }
      .absor-plus {
        background:url('/static/3D/images/dr/default/6+.png');
        &:hover{
            background:url('/static/3D/images/dr/hover/6+.png');
        }
        &.active {
            background:url('/static/3D/images/dr/click/6+.png');
        }
      }
      .hi {
        background:url('/static/3D/images/dr/default/7.png');
      }
      .f1 {
        background:url('/static/3D/images/dr/default/F1.png');
        background-size: 100%;
      }
      .f2 {
        background:url('/static/3D/images/dr/default/F2.png');
        background-size: 100%;
      }
      .f3 {
        background:url('/static/3D/images/dr/default/F3.png');
        background-size: 100%;
      }
      // .btn-8 {
      //   background:url('/static/3D/images/dr/default/8.png')
      // }
      @for $i from 8 through 32 {
        .btn-#{$i} {
          background:url('/static/3D/images/dr/default/' + $i+ '.png');
        }
      }
    }
  }

  .inverse .m-footer {
      background: #000;
  }

</style>
