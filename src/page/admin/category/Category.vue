<template>
  <div class="category">
    <div>
      <bread-crumb :breads="breads"></bread-crumb>
    </div>
    <div class="content-c">
      <div class="opr">
        <el-input class="search" v-model="input" @keyup.enter.native="addCate" placeholder="请输入内容"></el-input>
        <div>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addCate">添加</el-button>
          <el-button type="primary" size="small" icon="el-icon-search" @click="searchCate">查询</el-button>
        </div>
      </div>
      <div class="cate">
        <el-card class="box-card" v-for="(item, index) in categories" :key="item.id" shadow="hover">
          <div class="card-body">
            <h3>{{item.name}}</h3>
            <div>
              <el-button @click="editCate(item, index)" type="primary" icon="el-icon-edit" size="mini" circle></el-button>
              <el-button @click="deleteCate(item, index)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import api from '@/api'
import BreadCrumb from '@/components/common/TheBreadCrumb'
export default {
  name: 'Category',
  data () {
    return {
      breads: [{name: '博客管理'}, {name: '文章分类'}],
      categories: [],
      input: ''
    }
  },
  components: {
    BreadCrumb
  },
  mounted () {
    this.fetchData()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.path === '/admin/category') {
      this.fetchData()
      next()
    } else {
      next()
    }
  },
  methods: {
    addCate () {
      if (this.input.trim()) {
        api.addCategory({name: this.input}).then(res => {
          console.log(res)
          this.$message.success(res.message)
          this.input = ''
          this.fetchData()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    searchCate () {
      api.getCategory({name: this.input.trim()}).then(res => {
        console.log(res)
        this.categories = res.data
        this.input = ''
      }).catch(err => {
        console.log(err)
      })
    },
    editCate (data, index) {
      let id = data._id
      console.log(id)
      this.$router.push({path: '/admin/category/edit', query: {id}})
    },
    deleteCate (data, index) {
      let id = data._id
      this.$confirm('此操作将删除该分类，是否继续', '提示', {
        type: 'waring'
      }).then(() => {
        api.deleteCategory(id).then(res => {
          console.log(res)
          this.fetchData()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$notify.info({
          title: '提醒',
          message: '已取消'
        })
      })
    },
    fetchData () {
      api.getCategories().then(res => {
        console.log(res)
        this.categories = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-c {
  padding: 15px 10px;
  .opr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search {
      flex: 1;
      margin-right: 15px;
    }
    margin-bottom: 10px;
  }
  .box-card {
    margin-bottom: 5px;
    &:hover {
      h3 {
        color: #67c23a;
      }
    }
    .card-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>

