<template>
  <div class="m-header" ref="headerblog" :class="{hidden: hidden}">
    <h3 class="blogName" @click="$router.push('/leeing')">{{blogName}}</h3>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link menu">
        菜单<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><a @click="dialogPassword = true">修改密码</a></el-dropdown-item>
        <el-dropdown-item v-if="isAdmin"><a class="logoutBtn"  @click="$router.push('/admin')">后台管理</a></el-dropdown-item>
        <el-dropdown-item v-menu="'/nsts'"><a @click="$router.push('/nsts')">NSTS</a></el-dropdown-item>
        <el-dropdown-item v-menu="'/todo'"><a @click="$router.push('/todo')">TODO</a></el-dropdown-item>
        <el-dropdown-item v-menu="'/setting'"><a @click="$router.push('/leeing/setting')">用户设置</a></el-dropdown-item>
        <el-dropdown-item divided><a @click="logout">退出</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码 -->
    <transition name="fade">
      <div class="changePass" title="修改密码" v-if="dialogPassword" :style="{'z-index': 5000}">
        <div>
          <h3>修改密码</h3>
          <el-form :model="form" :rules="rules" ref="rulePass">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password" placeholder="请输入久密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
              <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="comfirmPassword">
              <el-input v-model="form.comfirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogPassword = cancelChange('rulePass')">取 消</el-button>
            <el-button type="primary" @click="changePassword('rulePass')">确 定</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import api from '@/api'
  import {removeToekn} from '@/util/auth'
  import {SesStorage} from '@/util/storage'
  import {mapGetters} from 'vuex'
  export default {
    name: 'HeaderBlog',
    props: {
      visibilityHeight: {
        type: Number,
        default: 100
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        blogName: 'LEE',
        hidden: false,
        dialogPassword: false,
        formLabelWidth: '100px',
        form: {
          oldPassword: '',
          newPassword: '',
          comfirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'username',
        'isAdmin'
      ])
    },
    mounted () {
      document.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
      document.removeEventListener('scroll', this.handleScroll)
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      changePassword (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.form.oldPassword === this.form.newPassword) {
              this.$message.warning('请输入新的密码')
              this.form.newPassword = ''
              this.form.comfirmPassword = ''
              return
            }
            let data = {
              username: this.username,
              password: this.form.oldPassword,
              newPass: this.form.newPassword
            }
            api.modifyPassword(data).then(res => {
              if (res.success) {
                this.$refs[formName].resetFields()
                this.$message.success('密码修改成功！')
                this.dialogPassword = false
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      cancelChange (formName) {
        this.$refs[formName].resetFields()
        this.dialogPassword = false
      },
      handleScroll () {
        let top = window.pageYOffset
        if (top > this.visibilityHeight) {
          this.hidden = true
        } else {
          this.hidden = false
        }
      },
      logout () {
        this.$confirm('是否确定退出博客？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.logout().then(res => {
            console.log(res)
            if (res.success) {
              removeToekn()
              SesStorage.clear()
              this.$router.push('/')
            }
          }).catch(err => {
            console.error(err)
          })
        }).catch(() => {
          this.$message.info('已取消')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 0 30px;
    background: #fffad0;
    border-bottom: 1px solid #ddd;
    z-index: 9;
    transition: all .3s ease-in-out;
    &.hidden {
      top: -80px;
    }
    .menu {
      padding: 15px;
      cursor: pointer;
    }
    .blogName {
      color: #f90;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .el-dropdown-menu__item {
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .changePass {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    > div {
      width: 40%;
      margin: 100px auto;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
    }
    h3 {
      margin-bottom: 15px;
    }
    .dialog-footer {
      text-align: right;
    }
  }
</style>
