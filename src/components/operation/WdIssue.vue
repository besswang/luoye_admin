<template>
  <div id="WdIssue">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/wd' }">观看和下载</el-breadcrumb-item>
          <el-breadcrumb-item>手工发放次数</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="width:50%;">
      <!-- <el-form-item label="发放名目">
        <el-input v-model="ruleForm.name" autocomplete="off" placeholder="手工发放名目"></el-input>
      </el-form-item> -->
      <el-form-item label="发放类型">
        <el-radio-group v-model="ruleForm.grantType">
          <el-radio :label=1>所有会员</el-radio>
          <el-radio :label=2>指定会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <transition name="fade">
        <div v-show="ruleForm.grantType == 2">
          <i style="color: #f56c6c;position:absolute;z-index:10;padding-top:12px;padding-left:2px;">*</i>
          <el-form-item label="会员编号">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入会员编号"
              v-model="ruleForm.toUsers">
            </el-input>
            <i style="font-size: 13px;color: #999;">请用空格或逗号隔开</i>
          </el-form-item>
        </div>
      </transition>
      <el-form-item label="奖励类型">
        <el-select v-model="ruleForm.rewardType">
          <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖励次数" prop="num">
        <el-input v-model="ruleForm.num" autocomplete="off" type="number">
          <template slot="append">次</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submitForm('ruleForm')">保存</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { AVAILABLE_TYPE } from '../meta/meta.js'
export default {
  name: 'WdIssue',
  data () {
    return {
      restaurants: [
        {'value': '三全鲜食（北新泾店)'},
        {'value': 'Hot honey 首尔炸鸡（仙霞路)'},
        {'value': '新旺角茶餐厅'}],
      searchText: '',
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      types: AVAILABLE_TYPE,
      ruleForm: {
        grantType: 1, // 发放类型
        toUsers: '', // 指定成员编号
        rewardType: 1, // 观看/下载
        num: '' // 奖励次数
      },
      rules: {
        num: [
          { required: true, validator: this.$global.valiNum, trigger: 'blur' }
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
    cancel () {
      this.$router.go(-1)
    },
    submitForm (formName) {
      if (this.ruleForm.grantType === 2) {
        if (!this.ruleForm.toUsers) {
          this.$message({
            message: '请填写会员编号',
            type: 'warning'
          })
          return false
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pam = {}
          for (let i in this.ruleForm) {
            if (this.ruleForm[i]) {
              pam[i] = this.ruleForm[i]
            }
          }
          this.api.harvestGrantApi(pam)
            .then((res) => {
              if (res.code === 200) {
                this.$router.push('/operation/wd')
              }
            })
        } else {
          return false
        }
      })
    },
    handleSelect (item) {
      console.log(item)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 所属平台
    radioFn (val) {
      console.log(val)
    },
    selectChange (val) {
      console.log(val)
      switch (val) {
        case '角色一':
          this.addForm.userType = 0
          break
        case '角色二':
          this.addForm.userType = 1
          break
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
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
  }
}
</script>

<style scoped>
  .m-ul>li{
    padding:0 10px;
    border-radius: 3px;
    border: 1px solid #dcdfe6;
    margin-right:5px;
    margin-bottom:5px;
  }
  .m-ul>li>i{
    padding-left:5px;
  }
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
    width: 375px;
    height: 175px;
    line-height: 175px;
    text-align: center;
  }
  .avatar {
    width: 375px;
    height: 175px;
    display: block;
  }
</style>
