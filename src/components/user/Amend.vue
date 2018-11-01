<template>
  <div id="Amend">
    <div class="login-con">
      <el-form :model="amendForm" status-icon ref="amendForm" :rules="ruleAmend">
        <el-form-item prop="oldPassword">
          <el-input v-model="amendForm.oldPassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="amendForm.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="amendForm.checkPassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="goAmend('amendForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Amend',
  data () {
    var oldPasswordFn = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var passwordFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.amendForm.password !== '') {
          this.$refs.amendForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var checkPasswordFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.amendForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      amendForm: {
        oldPassword: '',
        password: '',
        checkPassword: ''
      },
      ruleAmend: {
        password: [
          { validator: passwordFn, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: checkPasswordFn, trigger: 'blur' }
        ],
        oldPassword: [
          { validator: oldPasswordFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['amendFn']),
    // 确定修改
    goAmend (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.amendFn(this.amendForm)
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
