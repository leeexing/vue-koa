/**
 * 通用的混入方法
 */
import api from '@/api'
const mixinCommon = {
  created () {
    this.hello()
  },
  methods: {
    hello () {
      console.log('welcome to learn mixin ...')
    },
    fetchData () {
      throw new Error('This method must implement in the component')
    }
  }
}

const mixinAdmin = {
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      api.getUses().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export {
  mixinCommon,
  mixinAdmin
}
