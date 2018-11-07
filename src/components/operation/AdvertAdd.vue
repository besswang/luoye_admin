<template>
  <div id="WdIssue">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/advertising' }">广告管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumbText}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="BanForm" :model="BanForm" :rules="ruleBanform" label-width="80px" style="width:50%;">
      <el-form-item label="添加类型">
        <el-radio-group v-model="BanForm.type" @change="reset('BanForm')">
          <el-radio v-for="(v,i) in types" :key="i" :label="v.name">{{v.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="BanForm.title"></el-input>
      </el-form-item>
      <el-form-item label="执行时间" v-if="editTime">
        <el-date-picker
          v-model="BanForm.time"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <transition name="fade" v-if="BanForm.type == 1">
        <div>
          <el-form-item label="广告素材"
            prop="httpUrl"
            :rules="[{ required: true, message: '请上传素材图片', trigger: 'blur' }]">
            <el-upload
              :headers="myHeaders"
              class="avatar-uploader"
              action="/luoye_admin/advert/icon"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="BanForm.httpUrl" :src="BanForm.httpUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="color:#868686;font-size:10px;margin-top:-10px;line-height:14px;">建议尺寸：750（宽）*1120（高）</p>
          </el-form-item>
        </div>
      </transition>
      <transition name="fade" v-else>
        <div>
          <el-form-item label="弹屏内容"
            prop="content"
            :rules="[{ required: true, message: '请填写内容', trigger: 'blur' }]">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6}"
              placeholder="仅文本信息，100个汉字以内"
              v-model="BanForm.content">
            </el-input>
          </el-form-item>
        </div>
      </transition>
      <el-form-item label="指向链接">
        <el-input v-model="BanForm.link" placeholder="可以输入任意URL地址，例如：www.hao123.com"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="saveAdvert()">保存</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ADVER_TYPE_RADIO } from '../meta/meta.js'
export default {
  name: 'WdIssue',
  data () {
    var token = window.sessionStorage.getItem('token')
    return {
      editTime: true, // 编辑的时候,执行时间不显示
      myHeaders: {token: token},
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      types: ADVER_TYPE_RADIO,
      ruleBanform: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.BanForm.id) {
      this.types = this.types.filter(value => {
        return value.name === this.BanForm.type
      })
      this.editTime = false
      this.breadcrumbText = '编辑'
    } else {
      this.editTime = true
      this.breadcrumbText = '增加'
    }
  },
  computed: {
    ...mapGetters({
      BanForm: 'getEditAdver'
    })
  },
  methods: {
    ...mapMutations(['']),
    ...mapActions(['saveAdvert', 'handleAvatarSuccess']),
    reset (formName) {
      this.$refs[formName].resetFields()
    },
    cancel () {
      this.$router.go(-1)
    },
    handleSelect (item) {
      console.log(item)
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
    beforeAvatarUpload (file) {
      const isLt2M = parseInt(file.size) / 1024 / 1024 < 5
      var reg = /image\/\w+/
      if (!reg.test(file.type)) {
        this.$message({
          message: '图片格式只能是gif,jep,jpeg,png',
          type: 'warning'
        })
        return false
      }
      if (!isLt2M) {
        this.$message({
          message: '上传头像图片大小不能超过 5M!',
          type: 'warning'
        })
        return false
      }
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
