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
          http://192.168.0.139/luoye_admin/video/upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="addForm.imageUrl" :src="addForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- /video/upload -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
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
  <uploader :options="options" class="uploader-example" ref="uploader"
  @file-complete="fileComplete"
  @complete="complete"
  @file-success="fileSuccess"
  @file-added="fileAdded"
  @file-progress="fileProgress">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn :attrs="attrs">点击上传</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
  </div>
</template>

<script>
export default {
  name: 'AddVlist',
  data () {
    return {
      options: {
        target: 'http://192.168.0.139/luoye_admin/video/upload', // 'POST请求的目标URL',
        chunkSize: 4 * 1024 * 1024, // 每个上传的数据块的大小
        forceChunkSize: true, // 强制所有块都小于或等于chunkSize
        testChunks: false // 向服务器发出每个块的GET请求，以查看它是否已存在。如果在服务器端实现，即使在浏览器崩溃甚至计算机重启后，这也将允许上传恢复。（默认值：true）
        // preprocess: function () {
        //   console.log('666666')
        // }
      },
      attrs: {
        accept: 'video/*'
      },
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
    console.log(Math.max(54, 545, 2165, 545, 56))
    console.log(Math.min(54, 545, 2165, 545, 56))
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader
    })
  },
  methods: {
    // 上传特定文件的进度
    fileProgress (rootFile, file, chunk) {
      // console.log(rootFile, file, chunk)
    },
    // 此事件用于文件验证。拒绝此文件返回false
    fileAdded (file, event) {
      console.log(arguments)
      // console.log(file, event)
      // console.log(file.chunks)
    },
    // 上传成功的事件
    fileSuccess (rootFile, file, message, chunk) {
      // console.log('complete', rootFile, file, message, chunk)
    },
    // 根文件（文件夹）已完成。
    fileComplete (rootFile) {
      // console.log('file complete', arguments)
      // console.log(rootFile)
    },
    // 上传完成。
    complete () {
      // console.log('complete', arguments)
    },
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
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
