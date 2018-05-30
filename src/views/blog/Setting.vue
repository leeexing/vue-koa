<template>
  <div class="m-setting">
    <h3>用户信息详情</h3>
    <div class="user-info">
      <p>用户名：{{username}}</p>
      <p>邮箱：{{email}}</p>
      <p>签名：{{signature}}</p>
    </div>
    <div class="avatar">
      <h3 @click="updateUserInfo">修改用户头像</h3>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/api/blog/user/avatar"
        :headers="headers"
        method="post"
        :on-change="onChange"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import {getToken} from '@/util/auth'
import {mapGetters} from 'vuex'
export default {
  name: 'setting',
  data () {
    return {
      imageUrl: '',
      signature: '做会吃肉的饭',
      email: 'xxxxxxxx.com',
      headers: {
        authorization: 'Bearer '
      }
    }
  },
  mounted () {
    this.headers.authorization = 'Bearer ' + getToken()
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    onChange (file, fileList) {
      // console.log(file)
      // if (!file.response.success) {
      //   this.$message.warning(file.response.message)
      //   return
      // }
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      if (res.success) {
        this.updateUserInfo()
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message.warning(res.message)
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    updateUserInfo () {
      api.getCurrentUserInfo().then(res => {
        console.log(res)
        this.$store.dispatch('updateUserInfo', res.data.data)
        if (res.data.success) {
        } else {
          this.$message.warning(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.m-setting {
  h3 {
    padding: 15px 0;
  }
  .user-info {
    padding: 10px 0;
    p {
      line-height: 24px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
 
</style>
