<template>
  <div id="Add">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/member/list' }">会员列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumbText}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="addForm" :model="addForm" status-icon label-width="120px" style="width:50%;" :rules="ruleAdd">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="addForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="checkPassword">
        <el-input v-model="addForm.checkPassword"></el-input>
      </el-form-item>
      <!-- <el-form-item label="昵称">
        <el-input v-model="addForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="addForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="state" @change="selectChange">
          <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="addForm.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click.native="addFn('addForm')">保存</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Add',
  data () {
    var passwordFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.addForm.password !== '') {
          this.$refs.addForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var checkPasswordFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      // types: ['角色一', '角色二'],
      // state: '默认角色',
      addForm: {
        userName: '', // 用户名
        password: '', // 密码
        checkPassword: '' // 重复密码
        // nickname: '', // 昵称
        // tel: '',
        // email: '',
        // imageUrl: '', // 头像
        // userType: '', // 用户类型
        // desc: '' // 个人简介
      },
      ruleAdd: {
        userName: [
          { validator: this.$global.valiTel, trigger: 'blur' }
        ],
        password: [
          { validator: passwordFn, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: checkPasswordFn, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let id = this.$route.params.id
    if (id !== ' ') {
      this.breadcrumbText = '编辑'
    } else {
      this.breadcrumbText = '增加'
    }
  },
  methods: {
    ...mapActions(['add']),
    cancel () {
      this.$router.go(-1)
    },
    addFn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.add(this.addForm)
          this.api.addApi(this.addForm)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.push('/member/list')
          }, 800)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // selectChange (val) {
    //   console.log(val)
    //   switch (val) {
    //     case '角色一':
    //       this.addForm.userType = 0
    //       break
    //     case '角色二':
    //       this.addForm.userType = 1
    //       break
    //   }
    // },
    // handleAvatarSuccess (res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    // beforeAvatarUpload (file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // }
  }
}
</script>

<style scoped>
  .avatar-uploader >>> .el-upload {
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
</style>
