<template>
  <div class="m-setting">
    <h3>用户信息详情</h3>
    <div class="user-info">
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="email" :placeholder="emailP"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="signature" :placeholder="signatureP"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput" :disabled="dynamicTags.length >= 5">+ New Tag</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editUserInfo">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="avatar-edit">
      <h3>修改用户头像</h3>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/api/blog/user/avatar"
        :headers="headers"
        method="post"
        :on-change="onChange"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarFailure"
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
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      imageUrl: '',
      signature: '我们生来就是孤独 星空和黑夜',
      signatureP: '我们生来就是孤独 星空和黑夜',
      email: '6740234278.com',
      emailP: '6740234278.com',
      headers: {
        authorization: 'Bearer '
      }
    }
  },
  mounted () {
    this.headers.authorization = 'Bearer ' + getToken()
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  methods: {
    handleClose (tag) {
      console.log(tag)
      let username = this.username
      api.deleteTag({tag, username}).then(res => {
        console.log(res)
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      }).catch(err => console.log(err))
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        let data = {
          username: this.username,
          tag: inputValue
        }
        api.addNewTag(data).then(res => {
          console.log(res)
          this.dynamicTags.push(inputValue)
          this.inputVisible = false
          this.inputValue = ''
        }).catch(err => console.log(err))
      }
    },
    getUserInfo () {
      api.getCurrentUserInfo().then(res => {
        console.log(res)
        this.email = this.emailP = res.data.email
        this.signature = this.signatureP = res.data.signature
        this.dynamicTags = res.data.tags
      }).catch(err => {
        console.log(err)
      })
    },
    editUserInfo () {
      if (!this.email || !this.signature) {
        this.$message.warning('修改信息不能为空！😝')
        return
      }
      if (this.email === this.emailP && this.signature === this.signatureP) {
        this.$message.success('用户信息保存成功！✅')
        return
      }
      this.$confirm('确定修改用户的这些信息吗？😜', '提示', {type: 'warning'})
        .then(() => {
          let putData = {
            username: this.$store.state.username,
            email: this.email,
            signature: this.signature
          }
          api.putUserInfo(putData).then(res => {
            this.email = res.data.email
            this.signature = res.data.signature
          }).catch(err => {
            console.log(err)
          })
        })
        .catch(() => {
          this.$message('已取消修改')
        })
    },
    onChange (file, fileList) {
      // console.log(file)
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
    handleAvatarFailure (err) {
      console.log(err)
      if (err.status === 401) {
        this.$router.push('/login')
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
        this.$store.dispatch('updateUserInfo', res.data)
        if (res.success) {
          this.$message.success('头像修改成功')
        } else {
          this.$message.warning('头像上传失败')
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
