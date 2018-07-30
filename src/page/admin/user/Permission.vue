<template>
  <div class="m-permission">
    <bread-crumb :breads="breads"></bread-crumb>
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
            label="菜单名称"
            sortable
            prop='name'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="url">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="用户角色"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.userType.join(',') }}</span>
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
          :total="totalMenus">
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
export default {
  name: '',
  data () {
    return {
      breads: [{name: '菜单权限列表'}],
      userSearch: '',
      MenusData: [],
      totalMenus: 0,
      pageSize: 4,
      currentPage: 1,
      showEdit: false,
      editData: {},
      testNext: {a: 1}
    }
  },
  created () {
    this.fetchPermission()
  },
  computed: {
    tableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = Math.min(this.totalMenus, this.pageSize * this.currentPage)
      return this.MenusData.slice(start, end)
    }
  },
  methods: {
    fetchPermission () {
      api.fetchPermissions().then(res => {
        console.log(res)
        this.MenusData = res.data
        this.totalMenus = this.MenusData.length
      }).catch(console.log)
    },
    handleEdit (index, row) {
      let id = row._id
      this.$router.push({path: '/admin/permission/edit', query: {id}})
    },
    handleDelete (index, row) {
      let id = row._id
      this.$confirm('此操作将彻底删除该用户所有信息，是否继续？', '提示').then(_ => {
        api.deleteUser(id).then(res => {
          console.log(res)
          this.tableData.splice(index, 1)
        }).catch(console.log)
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
  components: {
    BreadCrumb
  }
}
</script>

<style lang="scss" scoped>
.m-permission {
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
