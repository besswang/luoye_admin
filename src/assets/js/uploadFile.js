import Vue from 'vue'
import SparkMD5 from 'spark-md5'
export default function () {
  // 将上传文件的方法挂载到vue的原型链上面
  Vue.prototype.uploadFile = uploadFile
  function uploadFile (file, backtopage) {
    // 得到md5码
    var index = 0
    getFileMD5(file, md5 => {
      index++
      var obj = {
        key: index,
        md5: md5
      }
      this.$Fetch(`video/checkPart/${md5}`, {method: 'post', body: {MD5Key: md5}})
        .then((res) => {
          // console.log(res)
          uploadChunk(this, file, obj, backtopage)
        }).catch((err) => {
          if (err) {

          }
        })
    })
  }
  // currentChunk为上传文件块的索引
  function uploadChunk (that, file, md5Obj, backtopage) {
    // console.log(md5, currentChunk)
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
      // fd.append('MD5Key', md5)
      // fd.append('chunksize', chunkSize) // 当前片的大小
      // fd.append('part', parseInt(currentChunk))
      // 设置上传的当前的文件块
      fd.append('file', new Blob([this.result]))
      fd.append('fileName', file.name)
      fd.append('totalPart', chunks) // 总片数
      fd.append('GUID', file.uid)
    }
  }
  // 获得文件md5
  function getFileMD5 (file, callback) {
    // 声明必要的变量
    var fileReader = new FileReader()
    // 文件每块分割2M，计算分割详情
    var chunkSize = 4194304
    var chunks = Math.ceil(file.size / chunkSize)
    var currentChunk = -1
    // 创建md5对象（基于SparkMD5）
    var spark = new SparkMD5()
    // 每块文件读取完毕之后的处理
    fileReader.onload = function (e) {
      // 每块交由sparkMD5进行计算
      spark.appendBinary(e.target.result)
      currentChunk++
      // 如果文件处理完成计算MD5，如果还有分片继续处理
      if (currentChunk < chunks) {
        loadNext()
        callback(spark.end())
      }
      // else {
      //   callback(spark.end())
      // }
    }
    // 处理单片文件的上传
    function loadNext () {
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsBinaryString(file.slice(start, end))
    }
    loadNext()
  }
}
