<template>
  <div id="login">
    <div class="m-login">
      <img class="logo" src="../../assets/images/avatar.png">
      <el-row class="content">
        <el-col :xs="24" :sm="{span: 12, offset: 6}">
          <el-row>
            <el-input v-model="account" placeholder="账号" type="text"></el-input>
            <el-input @keyup.enter.native="login" v-model="password" placeholder="密码" type="password"></el-input>
            <el-input v-if="isRegister" @keyup.enter.native="signIn" v-model="repassword" placeholder="确认密码" type="password"></el-input>
            <el-button v-if="!isRegister" type="primary" @click="login">登录</el-button>
            <el-button v-if="isRegister" type="success" @click="signIn">注册</el-button>
            <a v-if="!isRegister" class="register" @click="switch2register">注册?</a>
            <a v-if="isRegister" class="register" @click="switch2login">已注册，立马登录</a>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import api from '@/api'
import {mapGetters} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      repassword: ''
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'isRegister'
    ])
  },
  methods: {
    switch2register () {
      this.$store.dispatch('switchRegister', true)
    },
    switch2login () {
      this.$store.dispatch('switchRegister', false)
    },
    signIn () {
      let obj = {
        username: this.account,
        password: this.password
      }
      if (_.isEmpty(this.account) || _.isEmpty(this.password)) {
        this.$message.error('用户名或密码不能为空！')
        return
      }
      if (!_.isEqual(this.password, this.repassword)) {
        this.$message.error('两次密码不一致！')
        return
      }
      api.register(obj).then(res => {
        console.log(res)
        if (res.success) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.$store.dispatch('switchRegister', false)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    login () {
      let obj = {
        username: this.account,
        password: this.password
      }
      if (_.isEmpty(this.account) || _.isEmpty(this.password)) {
        this.$message.error('用户名或密码不能为空！')
        return
      }
      api.login(obj).then(res => {
        console.log(res)
        this.username = ''
        this.password = ''
        this.$store.state.isLogined = true
        this.$store.commit('SAVE_USERNAME', res.data.userInfo.name)
        this.$store.dispatch('setAdmin', res.data.userInfo.isAdmin)
        // TODO:如何保存token
        // sessionStorage.setItem('vue-koa-token', JSON.stringify(res.data.data.token)) // 用sessionstorage 把 token 存下来
        this.$router.push('/leeing')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  flex: auto;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  text-align: center;
  // background: url(https://cn.bing.com/az/hprichbg/rb/Love_ZH-CN11474763511_1920x1080.jpg);
  background: url('../../assets/images/logo_bg.jpg');
  background-size: 100% 100%;
  .m-login {
    padding: 20px;
    border-radius: 5px;
  }
  .logo {
    width: 200px;
    height: 200px;
    border-radius: 5px;
  }
}
.content {
  padding: 16px;
  .title {
    font-size: 28px;
  }
  .el-input {
    margin: 12px 0;
  }
  button {
    width: 100%;
    margin-top: 12px;
  }
  .register {
    display: inline-block;
    margin-top: 10px;
    text-decoration: underline;
    color: #aaa;
    &:hover {
      color: #ff7a45;
    }
  }
}
</style>
