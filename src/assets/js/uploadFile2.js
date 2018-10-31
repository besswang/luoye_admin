import Vue from 'vue'
import SparkMD5 from 'spark-md5'
export default function () {
  // 将上传文件的方法挂载到vue的原型链上面
  Vue.prototype.uploadFile = uploadFile
  function uploadFile (file, backtopage) {
    getFileMD5(file, 0, md5 => {
      file.md5 = md5
      // 存储文件的md5码
      this.$Fetch(`video/checkPart/${md5}`, {method: 'post', body: {MD5Key: md5}})
        .then((res) => {
          if (res.msg === 'SUCCESS') {
            uploadChunk(this, file, 0, backtopage)
          }
        })
        .catch((err) => {
          // 当前一片已经上传
          console.log('错误')
          console.log(err)
          if (err.msg !== '分片已经上传') {
            console.log('看几次')
            // uploadChunk(this, file, 0, backtopage)
          }
        })
      // 拿md5码查询后台数据库是否存在此md5码，如果存在则无需上传
      // handleAjax为封装好的ajax方法
      // this.handleAjax('api/doc/file/getFileByMd5', {
      //   md5,
      //   name: file.name
      // }, res => {
      //   if (!res.data) { // 不存在
      //     // 开始上传文件
      //     uploadChunk(this, file, 0, backtopage)
      //   } else { // 秒传
      //     // 文件上传成功
      //     backtopage && backtopage()
      //   }
      // })
    })
  }
  // currentChunk为上传文件块的索引
  function uploadChunk (that, file, currentChunk, backtopage) {
    console.log('开始up')
    console.log(file.md5)
    let self = that
    var fileReader = new FileReader()
    // 上传文件块的大小，可自定义
    var chunkSize = 4194304
    // 计算改文件的可分为多少块
    var chunks = Math.ceil(file.size / chunkSize)
    // 文件切割后的回调，this.result为切割的文件块
    fileReader.onload = function (e) {
      // 用FormData传输文件对象
      let fd = new FormData()
      // 设置文件上传接口的需要的参数
      fd.append('MD5Key', file.md5)
      // fd.append('chunksize', chunkSize) // 当前片的大小
      fd.append('part', parseInt(currentChunk + 1))
      // 设置上传的当前的文件块
      fd.append('file', new Blob([this.result]))
      fd.append('fileName', file.name)
      fd.append('totalPart', chunks) // 总片数
      fd.append('GUID', file.uid)
      self.$Fetch('video/upload', {method: 'post', body: fd})
        .then((res) => {

        }).catch((err) => {
          if (err) {

          }
        })
    }

    // 处理单片文件的上传
    function loadNext () {
      // 查询后台判断当前块文件有没有上传，如果已经上传则不需要上传，继续读取下一块
      // that.handleAjax('api/common/file/checkChunk', {md5:upload.md5, chunk:currentChunk}, res => {
      // that.handleAjax('api/common/file/checkChunk', {md5: file.md5, chunk: currentChunk}, res => {
      //   // 后台返回没有上传过
      //   if (res.data === false) {
      //     // 计算切割文件的开始索引和结束索引
      //     var start = currentChunk * chunkSize
      //     var end = Math.min(start + chunkSize, file.size)
      //     // 切割文件并触发fileReader.onload
      //     fileReader.readAsArrayBuffer(file.slice(start, end))
      //     // 后台返回此块已经上传过，递归调用loadNext，继续判断下一块文件块
      //   } else {
      //     currentChunk++
      //     if (currentChunk < chunks) {
      //       loadNext()
      //     }
      //   }
      // }, err => {
      //   // 文件上传出错
      //   if (err) {
      //     console.log(err)
      //   }
      // })
    }
    // 触发文件第一块上传
    loadNext()
  }

  // 获得文件md5
  function getFileMD5 (file, currentChunk, callback) {
    // 声明必要的变量
    var fileReader = new FileReader()
    // 文件每块分割2M，计算分割详情
    var chunkSize = 4194304
    var chunks = Math.ceil(file.size / chunkSize)
    // 创建md5对象（基于SparkMD5）
    // var spark = new SparkMD5.ArrayBuffer()
    var spark = new SparkMD5()
    // 每块文件读取完毕之后的处理
    fileReader.onload = function (e) {
      // 每块交由sparkMD5进行计算
      spark.appendBinary(e.target.result)
      // spark.append(e.target.result)
      // currentChunk++
      // 如果文件处理完成计算MD5，如果还有分片继续处理
      if (currentChunk < chunks) {
        // loadNext()
        // 分片的md5
        callback(spark.end())
      }
      // else {
      //   //文件的md5
      //   callback(spark.end())
      // }
    }
    // 处理单片文件的上传
    function loadNext () {
      // console.log(currentChunk)
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsBinaryString(file.slice(start, end))
    }
    loadNext()
  }
}
