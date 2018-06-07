<template>
  <div class="category">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
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
  </div>
</template>

<script>
import api from '@/api'
import BreadCrumb from '@/components/common/BreadCrumb'
export default {
  name: 'Category',
  data () {
    return {
      breadinfo: [{name: '博客管理', path: '/admin/artical'}, {name: '文章分类'}],
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
        // this.input = ''
      }).catch(err => {
        console.log(err)
      })
    },
    editCate (data, index) {
      let id = data._id
      console.log(id)
    },
    deleteCate (data, index) {
      let id = data._id
      api.deleteCategory(id).then(res => {
        console.log(res)
        this.fetchData()
      }).catch(err => {
        console.log(err)
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

