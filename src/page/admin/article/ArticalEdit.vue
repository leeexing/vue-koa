<template>
  <subpage>
    <div class="m-article-add">
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
              <vue-editor id="editor2" v-model="articleInfo.brief"></vue-editor>
              <!-- <el-input type="textarea" placeholder="请输入该文章的简介" :autosize="{ minRows: 2, maxRows: 4}" v-model="articleInfo.brief"> -->
            </el-form-item>
            <el-form-item label="文章内容">
              <!-- <el-input type="textarea" placeholder="请输入内容" :rows="5" v-model="articleInfo.content" /> -->
              <vue-editor id="editor1" v-model="articleInfo.content"></vue-editor>
            </el-form-item>
            <el-form-item label="文章评论">
              <el-table
                stripe
                :data="articleInfo.comments"
                style="width: 100%">
                <el-table-column
                  label="日期"
                  width="180">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | formatMongoTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="author"
                  label="评论人"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="body"
                  label="评论内容">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="shield(scope.$index, true)" size="small" v-if="!scope.row.disabled">屏蔽</el-button>
                    <el-button type="success" @click="shield(scope.$index, false)" size="small" v-else>取消屏蔽</el-button>
                    <!-- <el-button type="text" size="small">编辑</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item class="btn-wrap">
              <el-button type="success" @click="certain">确认</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <back-top></back-top>
  </subpage>
</template>

<script>
import api from '@/api'
import _ from 'lodash'
import Subpage from '@/components/subpage/Subpage'
import BreadCrumb from '@/components/common/TheBreadCrumb'
import {VueEditor} from 'vue2-editor'
import BackTop from '@/components/backToTop/InnerToTop'
export default {
  name: 'addArtical',
  data () {
    return {
      breads: [{name: '博客管理'}, {name: '文章列表', path: '/admin/article'}, {name: '修改文章'}],
      articleInfo: {
        title: '',
        brief: '',
        content: '<h1>Some initial content</h1>'
      },
      options: []
    }
  },
  mounted () {
    this.id = this.$route.query.id
    api.getArticleDetail(this.id).then(res => {
      console.log(res)
      this.articleInfo = res.data
      this.articleInfo.brief = res.data.brief
      if (res.data.body.indexOf('<p>') === -1) {
        this.articleInfo.content = `<p>${res.data.body}</p>`
      } else {
        this.articleInfo.content = res.data.body
      }
      this.tableComment = res.data.comments
    }).catch(err => {
      console.log(err)
    })
    api.getCategories().then(res => {
      console.log(res)
      this.options = res.data
    }).catch(err => console.log(err))
  },
  methods: {
    certain () {
      console.log(this.articleInfo)
      delete this.articleInfo._id
      if (_.isEmpty(this.articleInfo.title) || _.isEmpty(this.articleInfo.brief) ||
          _.isEmpty(this.articleInfo.content) || _.isEmpty(this.articleInfo.category)) {
        this.$notify.warning({
          title: '警告',
          message: '每项的内容都不能为空'
        })
        return
      }
      api.editArticle(this.id, this.articleInfo).then(res => {
        console.log(res)
        // this.$message.info(res.data.message)
      }).catch(err => console.log(err))
    },
    cancel () {
      this.$confirm('此操作将不保存已填写的文章内容，是否继续', '提示', {
        type: 'waring'
      }).then(() => {
        this.$message.success('已取消所填写内容')
      }).catch(() => {
        this.$notify.info({
          title: '提醒',
          message: '已取消'
        })
      })
    },
    shield (index, type) {
      this.$set(this.articleInfo.comments[index], 'disabled', type)
    },
    resetForm () {
      this.articleInfo.title = ''
      this.articleInfo.brife = ''
      this.articleInfo.content = ''
      this.category = ''
    }
  },
  components: {
    BreadCrumb,
    VueEditor,
    Subpage,
    BackTop
  }
}
</script>

<style lang="less">
.m-article-add {
  flex: auto;
  .content {
    padding: 20px 30px;
  }
}
</style>

