<template>
  <footer class="m-footer">
    <div class="keyboard">
      <div class="angle">
        <div class="angle-wrap">
          <div class="dr-amplify">
              <a><span class="j-dr-zoomindex">1.0</span> x</a>
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
      <div class="opr">
        <div class="level-1">
          <a class="dr-btn colours active" data-group="c" data-index="1" data-defaultindex="1" data-tag="default" title="真彩色"></a>
          <a class="dr-btn ms" data-group="c" data-index="2" data-defaultindex="1" data-tag="ms" title="无机物剔除"></a>
          <a class="dr-btn os" data-group="c" data-index="3" data-defaultindex="1" data-tag="os" title="有机物剔除"></a>
          <a class="dr-btn bw" data-group="c" data-index="0" data-defaultindex="1" data-tag="blackwhite" title="灰色显示"></a>
        </div>
        <div class="level-2">
          <a class="dr-btn gen" data-group="a" data-index="0" data-defaultindex="-1" data-tag="super" title="超级增强"></a>
          <a class="dr-btn absor-plus" data-group="absor" data-absor="5" title="可吸收率(+)"></a>
          <a class="dr-btn hi" data-group="b" data-index="0" data-defaultindex="-1" data-tag="superpenetrate" title="超级穿透"></a>
        </div>
        <div class="level-3">
          <a class="f-btn">F1</a>
          <a class="f-btn">F2</a>
          <a class="f-btn">F3</a>
        </div>
      </div>
      <div class="opr">
        <div class="level-1">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
        </div>
        <div class="level-2">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="l-btn"></a>
        </div>
        <div class="level-3">
          <a href="" class="l-btn"></a>
          <a href="" class="l-btn"></a>
        </div>
        <div class="level-4">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="l-btn"></a>
        </div>
      </div>
      <div class="opr">
        <div class="level-1">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
        </div>
        <div class="level-2">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
        </div>
        <div class="level-3">
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
          <a href="" class="d-btn"></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="scss">
.m-footer {
  margin-top: 20px;
  background: #7ad8e4;
  .keyboard {
    display:flex;
    justify-content: space-between;
    max-width: 1080px;
    margin: 0 auto;
  }
  .angle {
    display: flex;
    flex-direction: column;
  }
  .dr-btn, .d-btn{
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    margin: 10px;
  }
  .l-btn {
    @extend .dr-btn;
    width: 80px;
  }

}
</style>
