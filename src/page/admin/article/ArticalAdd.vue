<template>
  <subpage>
    <div class="addnew">
      <div>
        <bread-crumb :breads="breads"></bread-crumb>
      </div>
      <div class="content">
        <div class="artical">
          <el-form label-position="top" label-width="100px" :model="articleInfo">
            <el-form-item label="文章标题">
              <el-input v-model="articleInfo.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
              <el-select v-model="articleInfo.category" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>            
            </el-form-item>
            <el-form-item label="文章简介">
              <!-- <el-input type="textarea" placeholder="请输入该文章的简介" :autosize="{ minRows: 2, maxRows: 4}" v-model="articleInfo.brief" /> -->
              <vue-editor id="editor" v-model="articleInfo.brief"></vue-editor>
            </el-form-item>
            <el-form-item label="文章内容">
              <!-- <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="articleInfo.content">
              </el-input> -->
              <vue-editor id="editor" v-model="articleInfo.content"></vue-editor>
            </el-form-item>
            <el-form-item class="btn-wrap">
              <el-button type="success" @click="certain">确认</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </subpage>
</template>

<script>
import api from '@/api'
import _ from 'lodash'
import Subpage from '@/components/subpage/Subpage'
import BreadCrumb from '@/components/common/TheBreadCrumb'
import {mapGetters} from 'vuex'
import {VueEditor} from 'vue2-editor'
export default {
  name: 'addArtical',
  data () {
    return {
      breads: [{name: '博客管理'}, {name: '文章列表', path: '/admin/article'}, {name: '新增文章'}],
      articleInfo: {
        title: '',
        brief: '',
        category: '',
        content: '<h1>Please input your content ~</h1>'
      },
      options: []
    }
  },
  mounted () {
    api.getCategories().then(res => {
      console.log(res)
      this.options = res.data
    }).catch(err => console.log(err))
  },
  computed: {
    ...mapGetters([
      'userID'
    ])
  },
  methods: {
    certain () {
      if (_.isEmpty(this.articleInfo.title) ||
          _.isEmpty(this.articleInfo.brief) ||
          _.isEmpty(this.articleInfo.content) ||
          _.isEmpty(this.articleInfo.category)) {
        this.$notify.warning({
          title: '警告',
          message: '每项的内容都不能为空'
        })
        return
      }
      this.$set(this.articleInfo, 'userID', this.userID)
      api.addArticle(this.articleInfo).then(res => {
        console.log(res)
        this.$message.success('文章添加成功！')
        this.resetForm()
      }).catch(err => console.log(err))
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
      this.articleInfo.title = ''
      this.articleInfo.brief = ''
      this.articleInfo.content = ''
      this.articleInfo.category = ''
    }
  },
  components: {
    BreadCrumb,
    VueEditor,
    Subpage
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

