<template>
  <div id="login">
    <div class="login-con">
      <el-form :model="loginForm" status-icon :rules="ruleLogin" ref="loginForm">
        <el-form-item prop="userName">
          <el-input type="tel" v-model.number="loginForm.userName" placeholder="用户名" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
          <!-- <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goLogin('loginForm')" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-row class="pb15">
        <el-col :span="12" class="text-l">
          <router-link to="Register">注册</router-link>
        </el-col>
        <el-col :span="12" class="text-r">
          <router-link to="forget">忘记密码</router-link>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        let tel = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!tel.test(value)) {
          callback(new Error('请输入有效的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: null,
        password: ''
      },
      ruleLogin: {
        userName: [
          { validator: checkUser, trigger: 'blur' }
        ],
        password: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    goLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.loginForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-con{
  padding:30px 30px 8px 30px;
  width:20%;
  min-width:360px;
  margin:0 auto;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  position: absolute;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align: center;
}
</style>
