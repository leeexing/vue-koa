/**
 * TODO: 还可以扩展更多的 waves 效果。可以参考 vue-waves
 * FIXME: 目前的代码中 页面存在滚动条，hit 的效果显示不出来；主要是 top 的位置不对了
 *        猜测的原因可能是，1、页面（m-content）我设置了一个 padding-top: 80px 造成的
 *                        2、算法本身就有问题
*/
import './waves.scss'

const waves = {
  bind (el, binding) {
    console.log(binding)
    el.addEventListener('click', e => {
      let customOpts = Object.assign({
        type: binding.arg
      }, binding.value)
      let opts = Object.assign({
        ele: el,
        type: 'hit',
        color: 'rgba(0, 0, 0, 0.15)'
      }, customOpts)
      let target = opts.ele
      if (target) {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
        let rect = target.getBoundingClientRect()
        // console.log(rect)
        let ripple = target.querySelector('.waves-ripple')
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'waves-ripple'
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = (rect.height - ripple.offsetHeight) / 2 + 'px'
            ripple.style.left = (rect.width - ripple.offsetWidth) / 2 + 'px'
            break
          default:
            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple z-active'
        return false
      }
    }, false)
  },
  unbind (el, binding) {
    // FIXME: 监听的事件是匿名的内部函数，这里如何移除事件监听？
    // el.removeEventListener('click')
  }
}

export default waves
