<template>
  <div class="addnew">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="content">
      <div class="artical">
        <el-form label-position="top" label-width="100px" :model="formLabelAlign">
          <el-form-item label="文章标题">
            <el-input v-model="formLabelAlign.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select v-model="category" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>            
          </el-form-item>
          <el-form-item label="文章简介">
            <el-input type="textarea" placeholder="请输入该文章的简介" :autosize="{ minRows: 2, maxRows: 4}" v-model="formLabelAlign.brife">
            </el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <!-- <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="formLabelAlign.content">
            </el-input> -->
            <vue-editor v-model="formLabelAlign.content"></vue-editor>
          </el-form-item>
          <el-form-item class="btn-wrap">
            <el-button type="success" @click="certain">确认</el-button>
            <el-button @click="cancel">取消</el-button>
            <el-button icon="arrow-left"><router-link :to="{path:'/myadmin/artical'}">返回</router-link></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BreadCrumb from './breadcrumb'
import {VueEditor} from 'vue2-editor'
export default {
  name: 'addArtical',
  data () {
    return {
      breadinfo: [{name: '博客管理'}, {name: '文章列表', path: '/myadmin/artical'}, {name: '新增文章'}],
      formLabelAlign: {
        title: '',
        brife: '',
        content: ''
      },
      category: '',
      options: []
    }
  },
  mounted () {
    this.$http.get('/api/getCategory')
      .then(ret => {
        this.options = ret.data.message
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    certain () {
      let obj = {
        title: this.formLabelAlign.title,
        brife: this.formLabelAlign.brife,
        content: this.formLabelAlign.content,
        category: this.category,
        user: JSON.parse(sessionStorage.getItem('vue-koa-token')).id
      }
      if (_.isEmpty(this.formLabelAlign.title) ||
          _.isEmpty(this.formLabelAlign.brife) ||
          _.isEmpty(this.formLabelAlign.content) ||
          _.isEmpty(this.category)) {
        this.$notify.warning({
          title: '警告',
          message: '每项的内容都不能为空'
        })
        return
      }
      this.$http.post('/api/addNewArtical', obj)
        .then(ret => {
          if (!ret.data.success) {
            this.$message.error(ret.data.message)
            return
          }
          this.$message.info(ret.data.message)
          this.resetForm()
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err
          })
        })
    },
    cancel () {
      this.$confirm('此操作将不保存已填写的文章内容，是否继续', '提示', {
        type: 'waring'
      }).then(() => {
        this.resetForm()
        this.$message.success('已取消所填写内容')
      }).catch(() => {
        this.$notify.info({
          title: '提醒',
          message: '已取消'
        })
      })
    },
    resetForm () {
      this.formLabelAlign.title = ''
      this.formLabelAlign.brife = ''
      this.formLabelAlign.content = ''
      this.category = ''
    }
  },
  components: {
    BreadCrumb,
    VueEditor
  }
}
</script>

<style lang="less" scoped>
.addnew {
  flex: auto;
  .content {
    padding: 20px 30px;
  }
}
</style>

