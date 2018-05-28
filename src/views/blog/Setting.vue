<template>
  <div class="m-setting">
    <h3>用户信息详情</h3>
    <div class="user-info">
      <p>用户名：{{username}}</p>
      <p>修改用户头像</p>
    </div>

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
</template>

<script>
import {getToken} from '@/util/auth'
import {mapGetters} from 'vuex'
export default {
  name: 'setting',
  data () {
    return {
      imageUrl: '',
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
      console.log(file, fileList)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.m-setting {
  padding: 15px 0;
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
