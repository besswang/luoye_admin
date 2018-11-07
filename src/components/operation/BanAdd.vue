<template>
  <div id="BanAdd">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/bannerlist' }">banner管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumbText}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="BanForm" :model="BanForm" :rules="ruleBan" label-width="80px" style="width:50%;">
      <el-form-item label="Banner" prop="iconUrl">
        <el-upload
          :headers="myHeaders"
          class="avatar-uploader"
          action="/luoye_admin/banner/icon"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="BanForm.iconUrl " :src="BanForm.iconUrl " class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="color:#868686;font-size:10px;margin-top:-10px;line-height:14px;">建议尺寸：375（宽）*174（高）</p>
      </el-form-item>
      <i style="color: #f56c6c;position:absolute;z-index:10;padding-top:12px;padding-left:2px;">*</i>
      <el-form-item label="起止时间">
        <template>
          <div>
            <el-date-picker
              v-model="BanForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="type">
          <el-option v-for="(v,i) in types" :key="i" :value="v.value" :label="v.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转路径">
        <el-input v-model="BanForm.linkSource "></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="save('BanForm')">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BanAdd',
  data () {
    var token = window.sessionStorage.getItem('token')
    return {
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      types: [
        {value: 1, label: '外链'},
        {value: 2, label: '内部资源'}
      ],
      myHeaders: {token: token},
      type: 1,
      BanForm: {
        iconUrl: '', // 头像
        time: [],
        linkSource: '' // 跳转路径
      },
      shortUrl: '', // 图片上传逻辑，在提交的时候传/upload/image/20181104153326162_662286.jpg这样的地址，本地显示用http://192.168.0.139/luoye_admin/upload/image/20181104153326162_662286.jpg
      ruleBan: {
        iconUrl: [
          {required: true, message: '请上传banner', trigger: 'blur'}
        ]
      },
      startTime: '',
      endTime: ''
    }
  },
  mounted () {
    let id = this.$route.query.id
    if (id) {
      this.breadcrumbText = '编辑'
      let all = this.$route.query
      console.log(all)
      this.showForm(all)
    } else {
      this.breadcrumbText = '增加'
    }
  },
  methods: {
    showForm (obj) {
      console.log('555')
      this.BanForm.iconUrl = obj.iconUrl
      this.BanForm.linkSource = obj.linkSource
      this.BanForm.time.push(obj.onLineTime, obj.offLineTime)
      this.type = obj.type
      this.BanForm.linkSource = obj.linkSource
    },
    // 转时间格式
    timeFn (val) {
      if (val) {
        return this.$global.formatDate(new Date(val), 'YYYY-MM-DD')
      } else {
        return ''
      }
    },
    // 保存
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.BanForm.time) {
            this.startTime = Date.parse(this.BanForm.time[0])
            this.endTime = Date.parse(this.BanForm.time[1])
          } else {
            this.$message({
              message: '请选择起止时间',
              type: 'warning'
            })
            return false
          }
          let trans = {
            iconUrl: this.shortUrl,
            linkSource: this.BanForm.linkSource,
            onLineTime: this.startTime,
            offLineTime: this.endTime,
            type: this.type
          }
          let pam = {}
          for (let i in trans) {
            if (trans[i]) {
              pam[i] = trans[i]
            }
          }
          let id = this.$route.query.id
          if (id) { // 编辑保存
            let editObj = Object.assign(pam, {id: id})
            this.api.bannerEditApi(editObj)
              .then((res) => {
                if (res.code === 200) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.push('/operation/bannerlist')
                  }, 800)
                }
              })
          } else { // 增加保存
            this.api.bannerAddApi(pam)
              .then((res) => {
                if (res.code === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.push('/operation/bannerlist')
                  }, 800)
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      this.BanForm.iconUrl = res.data.viewUrl
      this.shortUrl = res.data.iconUrl
      // this.BanForm.iconUrl  = URL.createObjectURL(file.raw)
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
