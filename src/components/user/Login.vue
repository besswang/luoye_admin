<template>
  <div id="login">
    <div class="login-con">
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goLogin" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
      <el-row class="pb15">
        <el-col :span="12" class="text-l">
          <router-link to="Register">注册</router-link>
        </el-col>
        <el-col :span="12" class="text-r">
          <router-link to="forget">忘记密码</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    goLogin () {
      console.log('2233')
      this.$router.push('/main')
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
