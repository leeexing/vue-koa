<template>
  <div class="m-user">
    <div>
      <bread-crumb :breads="breads"></bread-crumb>
    </div>
    <div class="content">
      <div class="search">
        <el-row>
          <el-col :span="8">
            <el-input v-model="userSearch" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="id"
            sortable
            prop='_id'
            width="240">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop='username'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="密码">
            <template slot-scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="管理员"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.isAdmin ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="totalTopics">
        </el-pagination>
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
import BreadCrumb from '@/components/common/TheBreadCrumb'
import UserEdit from './UserEdit'
export default {
  name: 'home',
  data () {
    return {
      breads: [{name: '用户列表'}],
      userSearch: '',
      topicData: [],
      totalTopics: 0,
      pageSize: 4,
      currentPage: 1,
      showEdit: false,
      editData: {},
      testNext: {a: 1}
    }
  },
  created () {
    this.fetchUsers()
  },
  computed: {
    tableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = Math.min(this.totalTopics, this.pageSize * this.currentPage)
      return this.topicData.slice(start, end)
    }
  },
  methods: {
    fetchUsers () {
      api.getUsers().then(res => {
        console.log(res)
        this.topicData = res.data.users
        this.totalTopics = this.topicData.length
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (index, row) {
      let id = row._id
      this.$router.push({path: '/admin/user/edit', query: {id}})
    },
    handleDelete (index, row) {
      let id = row._id
      this.$confirm('此操作将彻底删除该用户所有信息，是否继续？', '提示').then(_ => {
        api.deleteUser(id).then(res => {
          console.log(res)
          this.tableData.splice(index, 1)
        }).catch(err => {
          console.log(err)
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },
    currentChange (val) {
      this.currentPage = val
    },
    search () {
      console.log('time')
    }
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to)
    if (to.path === '/admin/user') {
      this.fetchUsers()
      next()
    } else {
      next()
    }
  },
  // watch: {
  //   '$route': (to, from) => {
  //     if (to.path === '/admin/user') {
  //       console.log(this)
  //       this.fetchUsers()
  //     }
  //   }
  // },
  components: {
    BreadCrumb,
    UserEdit
  }
}
</script>

<style lang="less" scoped>
.m-user {
  flex: auto;
  .table {
    padding-top: 20px;
  }
  .content {
    padding: 15px;
  }
  .pages {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
  }
}
</style>

