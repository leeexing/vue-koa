<template>
  <subpage :customStyle="{background: 'transparent'}">
    <div class="m-albums">
      <h1>创建相册</h1>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="相册名称" prop="albumName">
          <el-input v-model="form.albumName" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册分类">
          <el-select v-model="form.albumType">
            <el-option label="人物" value="person"></el-option>
            <el-option label="风景" value="lanscape"></el-option>
            <el-option label="生活" value="life"></el-option>
            <el-option label="其他" value="others"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相册描述" prop="albumDescription">
          <el-input type="textarea" v-model="form.albumDescription" placeholder="请添加对该相册的描述"></el-input>
        </el-form-item>
        <el-form-item label="相册权限">
          <el-select v-model="form.albumPermissions">
            <el-option label="所有人可见" value="1"></el-option>
            <el-option label="好友可见" value="2"></el-option>
            <el-option label="私密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相册封面">
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="actionUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.smallPhotosUrl" :src="form.smallPhotosUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </subpage>
</template>

<script>
import api from '@/api'
import {getToken} from '@/util/auth'
import {baseURL} from '@/util/config'
import Subpage from '@/components/subpage/Subpage'
export default {
  name: 'album',
  data () {
    return {
      form: {
        userID: this.$store.state.userID,
        albumName: '',
        albumDescription: '',
        albumType: 'person',
        albumPermissions: '1',
        smallPhotosUrl: ''
      },
      rules: {
        albumName: [
          { required: true, message: '请输入相册名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        albumDescription: [
          { required: true, message: '请输入相册描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },
      headers: {
        authorization: 'Bearer ' + getToken()
      },
      actionUrl: baseURL + '/api/blog/album/cover'
    }
  },
  mounted () {
    this.fetchAlbums()
  },
  methods: {
    fetchAlbums () {
      //
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      if (res.success) {
        // this.updateUserInfo()
        this.form.smallPhotosUrl = res.data.coverUrl
        // this.form.smallPhotosUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message.warning(res.message)
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.5
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG | png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 0.5MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.createAlbum(this.form).then(res => {
            console.log(res)
            this.$message.success(res.message)
            this.$refs.form.resetFields()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  },
  components: {
    Subpage
  }
}
</script>

<style lang="scss" scoped>
.m-albums {
  padding: 0 30px;
  h1 {
    padding: 20px;
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
