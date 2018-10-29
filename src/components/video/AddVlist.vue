<template>
  <div id="AddVlist">
    <div class="ptb15 mb15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/video/list' }">视频列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="form" :model="addForm" label-width="80px" style="width:50%;">
      <el-form-item label="标题">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="state" @change="selectChange">
          <el-option v-for="(v,i) in types" :key="i" :value="v"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频">
        <!-- <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- /video/upload -->
      <el-upload
        class="upload-demo"
        action="http://192.168.0.139/luoye_admin/video/upload"
        :headers="headersObj"
        accept="video/*"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList2"
        :before-upload="beforeUpload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过M</div>
      </el-upload>
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
  name: 'AddVlist',
  data () {
    return {
      headersObj: {
        'Content-Type': 'multipart/form-data'
      },
      fileList2: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      types: ['角色一', '角色二'],
      state: '默认角色',
      addForm: {
        name: '',
        nickname: '',
        imageUrl: '', // 头像
        desc: '', // 个人简介
        userType: '', // 用户类型
        tel: '',
        email: ''
      },
      uploadData: {
        GUID: '1234', // 同一视频编号
        part: 1, // 分片编号
        file: '', // 文件
        MD5Key: '', // 分片唯一编号
        totalPart: 3 // 总片数
      }
    }
  },
  mounted () {

  },
  methods: {
    // 图片上传-上传之前
    beforeUpload (file) {
      // const chunkSize = 4 * 1024 * 1024 // 4MB一片
      // const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
      // console.log(chunkSize, chunkCount)
      // const isLt10M = file.size / 1024 / 1024  < 10
      // if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
      if (['video/mp4'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      this.uploadFile(file)
      // if (!isLt10M) {
    //     this.$message.error('上传视频大小不能超过10MB哦!')
    //     return false
      // }
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview (file) {
      // console.log(file)
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
