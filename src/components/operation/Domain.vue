<template>
  <div id="Domain">
    <el-form ref="form" :model="BanForm" label-width="80px" style="width:50%;">
      <el-form-item label="域名">
        <p>http://localhost:8084/operation/domain</p>
        <el-button type="primary" @click.native="addShow = true">增加</el-button>
      </el-form-item>
      <transition name="fade">
        <div v-show="addShow">
          <el-form-item label="域名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item v-show="addShow">
            <el-button type="primary">保存</el-button>
            <el-button @click.native="addShow = false">取消</el-button>
          </el-form-item>
        </div>
      </transition>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Domain',
  data () {
    return {
      addShow: false,
      breadcrumbText: '', // 当前面包屑的文本('编辑'，'增加')
      types: ['URL', '项目'],
      state: 'URL',
      BanForm: {
        name: '',
        imageUrl: '' // 头像
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
    // 增加域名
    addFn () {
      this.addShow = true
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
