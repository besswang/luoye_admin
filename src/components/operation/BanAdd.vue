<template>
  <div id="BanAdd">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/operation/bannerlist' }">banner管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{breadcrumbText}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="form" :model="BanForm" label-width="80px" style="width:50%;">
      <el-form-item label="Banner">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="BanForm.imageUrl" :src="BanForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="color:#868686;font-size:10px;margin-top:-10px;">建议尺寸：</span>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="BanForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="内容类型">
        <el-select v-model="state" @change="selectChange">
          <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指向内容">
        <el-select v-model="state" @change="selectChange">
          <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BanAdd',
  data () {
    return {
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
