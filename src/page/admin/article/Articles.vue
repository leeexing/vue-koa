<template>
  <div class="m-articleList">
    <div>
      <bread-crumb :breads="breads"></bread-crumb>
    </div>
    <div class="content">
      <div class="search">
        <el-row>
          <el-col :span="8">
            <el-input v-model="articalSearch" @keyup.enter="searchArtical" placeholder="请输入标题" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
              <el-button type="primary" icon="el-icon-plus" @click="$router.push({name: 'ArticleAdd'})"></el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table
          :data="topicData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <!-- <el-table-column
            type="index"
            width="60">
          </el-table-column> -->
          <el-table-column
            label="创建日期"
            width="180">
            <template slot-scope="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date.split('T')[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="180">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column
            label="内容简介">
            <template slot-scope="scope">
              {{scope.row.brief.slice(0, 15)}}
            </template>
          </el-table-column>
          <el-table-column
            label="阅读次数"
            width="100">
            <template slot-scope="scope">
              {{scope.row.meta.visit}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size="pageSize"
            :total="totalTopics">
          </el-pagination>
        </div>
      </div>
    </div>
    <transition enter-active-class="animated fadeIn"
                leave-active-class="animated slideOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import api from '@/api'
import _ from 'lodash'
import BreadCrumb from '@/components/common/TheBreadCrumb'
export default {
  name: 'home',
  data () {
    return {
      breads: [{name: '博客管理'}, {name: '文章列表'}],
      searchData: {},
      topicData: [],
      totalTopics: 0,
      pageSize: 5,
      currentPage: 1,
      formLabelAlign: {
        title: '',
        brife: '',
        content: ''
      },
      oldData: {},
      showEdit: false,
      articalSearch: '',
      editWrapTitle: '文章修改'
    }
  },
  mounted () {
    this.getArticalInfo()
  },
  methods: {
    getArticalInfo () {
      api.getArticleList({pageSize: this.pageSize, currentPage: this.currentPage}).then(res => {
        console.log(res)
        this.topicData = res.data.articles
        this.totalTopics = res.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增文章
    addNewArtical () {
      this.formLabelAlign = {
        title: '',
        brife: '',
        content: ''
      }
      this.editWrapTitle = '新增文章'
      this.showEdit = true
    },
    handleEdit (row) {
      let id = row._id
      this.$router.push({path: '/admin/article/edit', query: {id}})
      // let obj = {
      //   title: row.title,
      //   brife: row.brife,
      //   content: row.content,
      //   id: row._id
      // }
      // this.formLabelAlign = obj
      // this.oldData = row
      // this.showEdit = true
    },
    handleDelete (index, row) {
      console.log(index)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.topicData.splice(index, 1)
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    currentChange (val) {
      this.currentPage = val
      this.getArticalInfo()
    },
    certainEdit () {
      if (_.isEqual(this.oldData.title, this.formLabelAlign.title) &&
        _.isEqual(this.oldData.brife, this.formLabelAlign.brife) &&
        _.isEqual(this.oldData.content, this.formLabelAlign.content)) {
        this.$message.info('没有内容变更哦')
      } else {
        let postData = {
          title: this.formLabelAlign.title,
          brife: this.formLabelAlign.brife,
          content: this.formLabelAlign.content,
          id: this.formLabelAlign.id
        }
        this.$http.post('/api/editArtical', postData)
        .then(ret => {
          if (!ret.data.success) {
            this.$message.error(ret.data.message)
            return
          }
          this.$message.info(ret.data.message)
          this.getArticalInfo()
        })
        .catch(err => {
          console.log(err)
        })
      }
      this.showEdit = false
    },
    cancelEdit () {
      this.showEdit = false
    },
    searchArtical () {
      this.$notify({
        title: '成功',
        message: this.articalSearch || '您没有输入搜索内容',
        type: 'success'
      })
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="scss" scoped>
.m-articleList {
  flex: auto;
  .table {
    padding-top: 20px;
  }
}
.content {
  padding: 15px;
  a {
    color: #fff;
  }
}
.pages {
  display: flex;
  justify-content: center;
  padding: 15px;
}
.mask {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  &.show {
    display: block;
  }
  .artical {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 500px;
    padding: 10px 30px;
    background: #fff;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .title {
      padding: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #999;
      text-align: center;
    }
    .btn-wrap {
      text-align: right;
    }
  }
}
</style>

