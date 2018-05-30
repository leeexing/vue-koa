<template>
  <div class="m-webgl">
    <header>
      <h3 v-leeing:foo.a="'#f90'" message="hello">webgl 实验田</h3>
    </header>
    <div class="main">
      <section class="form">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple">
            单选
            <el-select v-model="value1"
              collapse-tags
              style="margin-left: 20px;" placeholder="请选择"
              @change="singleChange"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            多选
            <el-select v-model="value2"
              multiple style="margin-left: 20px;" placeholder="请选择"
              @change="multipleChange"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            分组多选
            <el-select v-model="value3"
              multiple placeholder="请选择"
              @change="groupChange"
            >
            <el-option-group
              v-for="group in options3"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-option-group>
          </el-select>
          </div></el-col>
        </el-row>
      </section>
      <section class="form">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple">
            <el-tree
              ref="tree1"
              :data="data2"
              :check-strictly="true"
              show-checkbox
              node-key="id"
              @check-change="checkChange"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="ids">
            </el-tree>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <p>选择的中文名：{{name}}</p>
            <p>选择的id：{{ids}}</p>
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <el-popover
              ref="popover2"
              placement="bottom"
              width="400"
              trigger="click">
              <el-tree
                ref="tree"
                :data="data2"
                :check-strictly="true"
                show-checkbox
                node-key="id"
                @check-change="checkChange"
                @current-change="currentChange"
                :getCheckedNodes="name"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]">
              </el-tree>
              <el-input slot="reference" v-model="name" placeholder="请点击选择" readonly="readonly"></el-input>
            </el-popover>
          </div></el-col>
        </el-row>
      </section>
      <section class="dr">
        <my-slot :items="items" :name="1">
          <li
            slot="item"
            slot-scope="props"
            class="slot-item"
          >
            {{ props.text}} -- {{ props.msg }}
          </li>
          <h1 slot="test" slot-scope="props">{{ props.info }}</h1>
        </my-slot>
      </section>
    </div>
  </div>
</template>

<script>
import mySlot from './MySlot.vue'
export default {
  name: 'weblg',
  components: {
    mySlot
  },
  data () {
    return {
      name: 'leeing',
      ids: [5],
      data2: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
      items: [
        {
          text: 'what you',
          msg: 'haha'
        },
        {
          text: 'hello',
          msg: 'world'
        }
      ],
      options1: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      options3: [
      ],
      options4: [
      ],
      value1: [],
      value2: [],
      value3: [],
      value4: []
    }
  },
  created () {
    // console.log(this.$el)
  },
  mounted () {
    // $el: 就是 这个组件，指带的就是这个组件的根元素包含的内容 div.m-webgl
    console.log(this.$el)
    let data = require('./selection.json')
    // console.log(data)
    this.options1 = data.single
    this.options2 = data.mutiple
    this.options3 = data.groupMul
    this.options4 = data.jilian
  },
  methods: {
    getIds (data) {
      let that = this
      function getChildids (arr) {
        let idsArr = []
        arr.forEach(item => {
          if (that.hasChild(item)) {
            idsArr.push(item.id)
            idsArr = idsArr.concat(getChildids(item.children))
          } else {
            idsArr.push(item.id)
          }
        })
        return idsArr
      }
      function getIds (data) {
        let ids = [data.id]
        ids = ids.concat(getChildids(data.children))
        return ids
      }
      return getIds(data)
    },
    hasChild (data) {
      return !!data.children
    },
    // 节点选中状态发生变化时的回调
    checkChange (val, checked, nodeChecked) {
      let that = this
      // console.log(`id: ${val.id} -- checked: ${checked} -- ${nodeChecked}`)
      let checkArr = this.$refs.tree.getCheckedKeys()
      iterator(this.data2)
      function iterator (data) {
        data.forEach(item => {
          if (that.hasChild(item)) {
            if (item.id === val.id && checked) {
              let ids = that.getIds(item)
              // console.error(`zengjia - ${ids}`)
              checkArr.push(...ids)
            } else if (item.id === val.id && !checked) {
              let ids = that.getIds(item)
              let checkSet = new Set(checkArr)
              // console.error(ids)
              ids.forEach(id => {
                checkSet.delete(id)
              })
              checkArr = [...checkSet]
            } else {
              iterator(item.children)
            }
          }
        })
      }
      checkArr = Array.from(new Set(checkArr))
      this.$refs.tree.setCheckedKeys(checkArr)
      this.name = this.$refs.tree.getCheckedNodes().map(node => node.label).join(', ')
      this.ids = checkArr
    },
    // 当前选中节点变化时触发的事件
    currentChange (data, node) {
    },
    singleChange (val) {
      // console.log(val)
    },
    multipleChange (val) {
      // console.log(val)
      if ((val.includes('all') && val.length > 1) || (val.length === (this.options2.length - 1))) {
        this.value2 = ['all']
        this.options2.forEach(option => {
          if (option.value !== 'all') {
            this.$set(option, 'disabled', true)
          }
        })
      } else if (val.includes('all') && val.length === 1) {
        this.options2.forEach(option => {
          if (option.value !== 'all') {
            this.$set(option, 'disabled', true)
          }
        })
      } else {
        this.options2.forEach(option => {
          this.$set(option, 'disabled', false)
        })
      }
    },
    groupChange (val) {
      // console.log(val)
      if (val.includes('all') && val.length > 1) {
        this.value3 = ['all']
        this.options3.forEach(option => {
          option.options.forEach(item => {
            if (item.value !== 'all') {
              this.$set(item, 'disabled', true)
            }
          })
        })
      } else if (val.includes('all') && val.length === 1) {
        this.options3.forEach(option => {
          option.options.forEach(item => {
            if (item.value !== 'all') {
              this.$set(item, 'disabled', true)
            }
          })
        })
      } else {
        this.options3.forEach(option => {
          option.options.forEach(item => {
            this.$set(item, 'disabled', false)
          })
        })
      }
    },
    jilianChange (val) {
      console.log(val)
    }
  },
  /**
   * 自定义局部指令
   */
  directives: {
    leeing: {
      inserted (el, binding) {
        // console.log('您好，我是局部注册指令')
        // console.log(el)
        // console.log(binding)
        el.style.color = binding.value
      }
    },
    leebind: {
      bind (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-webgl {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  header {
    display: flex;
    align-items: center;
    height: 60px;
    flex-shrink: 0;
    padding: 10px;
    color: #409EFF;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 2px #eee;
    h3 {
      letter-spacing: 2px;
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    section {
      width: 100%;
      &.form {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>

