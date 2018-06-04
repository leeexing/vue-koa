<template>
  <div class="editwrap" :class="{show: isShowEdit}">
    <h2 class="title">用户编辑</h2>
    <el-row>
      <el-col :span="18" :offset="1">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-switch on-text="" off-text="" v-model="formLabelAlign.isAdmin"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="editUser">确认</el-button>
            <el-button @click="cancelEdit">取消</el-button>
          </el-form-item>
        </el-form>   
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      labelPosition: 'right'
    }
  },
  props: ['isShowEdit', 'editData'],
  computed: {
    formLabelAlign () {
      return this.editData
    }
  },
  methods: {
    cancelEdit () {
      this.$emit('closeEdit')
    },
    editUser () {
      console.log(this.formLabelAlign)
      let obj = {
        username: this.formLabelAlign.name,
        password: this.formLabelAlign.password,
        isAdmin: this.formLabelAlign.isAdmin
      }
      api.putUserInfo(obj).then(res => {
        console.log(res)
        this.$message.info(res.data.message)
        this.$emit('closeEdit')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editwrap {
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 350px;
  padding: 30px 10px;
  transform: translate(-50%, -50%);
  border: 1px solid #ddd;
  box-shadow: 0 0 2px 2px #eee;
  background: #fff;
  z-index: 19;
  &.show {
    display: block;
  }
  .title {
    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>

