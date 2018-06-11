import './waves.scss'

const waves = {
  bind (el, binding) {
    el.addEventListener('click', e => {
      let customOpts = Object.assign({}, binding.value)
      let opts = Object.assign({
        ele: el,
        type: 'hit',
        colot: 'rgba(0, 0, 0, 0.15)'
      }, customOpts)
      let target = opts.ele
      if (target) {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
        let rect = target.getBoundingClientRect()
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
            ripple.style.top = (rect.height / 2 - ripple.offsetHeigiht / 2) + 'px'
            ripple.style.left = (rect.wdith / 2 - ripple.offsetWidth / 2) + 'px'
            break
          default:
            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scroolTop) + 'px'
            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scroolLeft) + 'px'
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple z-active'
        return false
      }
    }, false)
  }
}

export default waves
