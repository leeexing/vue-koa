<template>
  <div class="users">
    <div>
      <bread-crumb :breadinfo="breadinfo"></bread-crumb>
    </div>
    <div class="content">
      <div class="search">
        <el-row>
          <el-col :span="4">
            <el-input v-model="userSearch" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary">新增</el-button>
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
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            label="id"
            sortable
            prop='_id'
            width="280">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop='username'
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="密码"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否是管理员"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.isAdmin ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
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
    <v-mask></v-mask>
    <edit-user :editData="editData" :isShowEdit="showEdit" v-on:closeEdit="closeEditWrap"></edit-user>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import VMask from '@/components/common/TheMask'
import EditUser from './EditUser'
import Mock from 'mockjs'
export default {
  name: 'home',
  data () {
    return {
      breadinfo: [{name: '用户列表'}],
      userSearch: '',
      topicData: [],
      totalTopics: 0,
      pageSize: 8,
      currentPage: 1,
      showEdit: false,
      editData: {},
      testNext: {a: 1}
    }
  },
  created () {
    this.$http.get('/api/userlist')
      .then(ret => {
        console.log(ret)
        this.topicData = ret.data.message
        this.totalTopics = this.topicData.length
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {
    // this.$set(this.data, 'testNext', '133')
  },
  computed: {
    tableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = Math.min(this.totalTopics, this.pageSize * this.currentPage)
      return this.topicData.slice(start, end)
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(row)
      let obj = {
        name: row.username,
        password: row.password,
        isAdmin: row.isAdmin,
        id: row._id
      }
      this.editData = obj
      this.$store.dispatch('show_mask')
      this.showEdit = true
    },
    handleDelete (index, row) {
      console.log(index)
      this.tableData.splice(index, 1)
    },
    currentChange (val) {
      this.currentPage = val
    },
    closeEditWrap () {
      this.showEdit = false
      this.$store.dispatch('close_mask')
    },
    search () {
      let time = Mock.mock('@now')
      console.log(time)
      // this.testNext = Object.assign({}, this.testNext, {b: 45})
      this.$set(this.testNext, 'b', ' -- 466')
      // console.log(this.testNext)
      // console.log(this.$refs.test.textContent)
      // this.$nextTick(item => {
      //   console.log(item)
      //   console.log(this.$refs.test.textContent)
      // })
    }
  },
  components: {
    BreadCrumb,
    VMask,
    EditUser
  }
}
</script>

<style lang="less" scoped>
.users {
  flex: auto;
  .table {
    padding-top: 20px;
  }
}
.content {
  padding-top: 15px;
  padding-left: 15px;
}
.pages {
  display: flex;
  justify-content: flex-end;
  padding: 15px;
}
</style>

