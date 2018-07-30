<template>
  <subpage>
    <bread-crumb :breads="breads"></bread-crumb>
    <div class="userinfo">
      <el-row :gutter="10">
        <el-col :span="18">
          <el-form :label-position="labelPosition" label-width="100px" :model="userInfo">
            <el-form-item label="密码">
              <el-input v-model="userInfo.password" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="权限级别">
              <!-- <el-input v-model="userInfo.email"></el-input> -->
              <el-select v-model="userInfo.permissions" placeholder="请选择该用户权限级别">
                <el-option
                  v-for="item in permisions"
                  :key="item._id"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="管理员">
              <el-switch on-text="" off-text="" v-model="userInfo.isAdmin"></el-switch>
            </el-form-item> -->
            <el-form-item>
              <el-button type="danger" @click="editUser">确认</el-button>
              <!-- <el-button type="danger" @click="cancelEdit">重置密码</el-button> -->
            </el-form-item>
          </el-form>   
        </el-col>
        <el-col :span="6" class="avatar">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="userInfo.avatar" class="image">
            <div style="padding: 14px;">
              <h3>姓名：{{userInfo.username}}</h3>
              <div class="bottom clearfix">
                <p class="motto">Motto：{{ userInfo.signature }}</p>
                <el-button type="text" @click="resetUserPassword">重置密码</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </subpage>
</template>

<script>
import api from '@/api'
import BreadCrumb from '@/components/common/TheBreadCrumb'
import Subpage from '@/components/subpage/Subpage'
export default {
  name: 'userEdit',
  data () {
    return {
      breads: [{name: '菜单权限列表', path: '/admin/permission'}, {name: '修改子菜单信息'}],
      userInfo: {
        username: '',
        password: '',
        isAdmin: false
      },
      labelPosition: 'right',
      permisions: [{
        name: '普通用户',
        value: 1
      }, {
        name: 'VIP用户',
        value: 2
      }, {
        name: '管理员',
        value: 3
      }, {
        name: '超级管理员',
        value: 4
      }]
    }
  },
  mounted () {
    this.userID = this.$route.query.id
    // this.fetchPermisions()
    this.fetchUserInfo()
  },
  methods: {
    fetchPermisions () {
      let id = this.$route.query.id
      api.fetchMenus(id).then(res => {
        console.log(res)
        this.permisions = res.data
      })
    },
    fetchUserInfo () {
      let id = this.$route.query.id
      api.getUser(id).then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    editUser () {
      console.log(this.userInfo)
      let obj = {
        email: this.userInfo.email,
        permissions: this.userInfo.permissions
      }
      api.putUserInfo(this.userID, obj).then(res => {
        console.log(res)
      }).catch(err => console.log(err))
    },
    resetUserPassword () {
      this.$confirm('此操作将重置用户密码为123456，是否继续？', '提示').then(_ => {
        api.resetPassword(this.userID).then(res => {
          console.log(res)
          this.fetchUserInfo()
        }).catch(err => console.log(err))
      }).catch(_ => {
        this.$message.info('已取消重置')
      })
    }
  },
  components: {
    BreadCrumb,
    Subpage
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  margin-top: 20px;
  padding: 15px;
  .avatar {
    img {
      width: 100%;
    }
    .bottom {
      padding-top: 5px;
    }
    .motto {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>
