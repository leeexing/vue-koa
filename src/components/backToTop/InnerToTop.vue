<template>
  <transition :name="transitionName">
    <div class="back-to-ceiling-inner" @click="backToTop" v-show="visible" :style="customStyle">
      <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--backToTopArrow" aria-hidden="true" style="height: 16px; width: 16px;">
        <title>回到顶部</title>
        <g>
          <path d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" fill-rule="evenodd"></path>
        </g>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          background: '#e7eaf1',
          'border-radius': '4px',
          'line-height': '45px'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    container: {
      type: String,
      default: 'm-subpage'
    }
  },
  data () {
    return {
      visible: false,
      interval: null
    }
  },
  mounted () {
    this.scrollWrap = document.querySelector('.m-subpage')
    this.scrollWrap.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    this.scrollWrap.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll () {
      this.visible = this.scrollWrap.scrollTop > this.visibilityHeight
    },
    backToTop () {
      let start = this.scrollWrap.scrollTop
      let i = 0
      this.interval = setInterval(() => {
        let next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          this.scrollWrap.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
        } else {
          this.scrollWrap.scrollTo(0, next)
        }
        i++
      }, 16.7)
    },
    // 蒙蔽的算法
    easeInOutQuad (t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b
      }
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  }
}
</script>

<style lang="scss" scoped>
// transition name fade is in style/transition.scss
.back-to-ceiling-inner {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  z-index: 99;
  &:hover {
    background: #d5dbe7;
  }
  .Icon {
    fill: #9aaabf;
    background: none;
  }
}
</style>
