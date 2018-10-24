<template>
  <div id="Register">
    <div class="login-con">
      <el-form ref="loginForm" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item class="flex flex-c">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:calc(100% - 120px);"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" placeholder="设置密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      loginForm: {
        name: '',
        code: '',
        password: ''
      }
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
