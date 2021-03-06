// https://www.liangzl.com/get-article-detail-8982.html
// uploadFile.js
import Vue from 'vue'
import SparkMD5 from 'spark-md5'
export default function () {
  // 将上传文件的方法挂载到vue的原型链上面
  Vue.prototype.uploadFile = uploadFile
  function uploadFile (file, backtopage) {
    var form = new FormData()
    console.log('准备中。。。')
    // 得到md5码
    getFileMD5(file, md5 => {
      // 存储文件的md5码
      // 用最后一片的md5判断,如果存在最后一片的md5,说明文件存在，否则从第一片开始上传
      // file.md5 = md5
      form.append('MD5Key', md5)
      // 拿md5码查询后台数据库是否存在此md5码，如果存在则无需上传
      this.$Fetch(`video/checkPart/${md5}`, {method: 'post', body: {MD5Key: md5}})
        .then((res) => {
          uploadChunk(this, file, 0, backtopage)
        })
        .catch((err) => {
          // 当前一片已经上传
          console.log('错误')
          console.log(err)
        })
    })
  }
  // currentChunk为上传文件块的索引
  function uploadChunk (that, file, currentChunk, backtopage) {
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
      let xhr = new XMLHttpRequest()
      // xhr.open('post', 'api/common/file/upload', true)
      xhr.open('post', '/luoye_admin/video/upload', true)
      xhr.onreadystatechange = function () {
        // 上传成功
        if (xhr.readyState === 4 && xhr.status === 200) {
          currentChunk++
          if (currentChunk < chunks) {
            console.log('这里会继续下一块')
            loadNext() // 继续切割下一块文件
          } else {
            // 文件上传成功
            backtopage && backtopage()
          }
          xhr = null
          return
        }
        if (xhr.readyState === 4 && xhr.status === 500) {
        // 文件上传出错
        }
      }
      // 文件上传进度条
      xhr.upload.onprogress = function (e) {
        // 计算上传的进度
        // const progress = parseInt((e.loaded + currentChunk * chunkSize) / file.size * 100)
        // 更新ui
      }
      xhr.onerror = xhr.upload.onerror = function () {
        // 文件上传出错
      }
      // 开始发送
      xhr.send(fd)
      fd = null
    }
    // 处理单片文件的上传
    function loadNext () {
      // 查询后台判断当前块文件有没有上传，如果已经上传则不需要上传，继续读取下一块,upload.md5
      // that.$Fetch('api/common/file/checkChunk', { md5: file.md5, chunk: currentChunk }, res => {
      // console.log(file, file.md5, currentChunk, chunks)
      // let fetchForm = new FormData()
      // fetchForm.append('MD5Key', file.md5)
      // fetchForm.append('part', currentChunk)
      // fetchForm.append('file', file)
      // fetchForm.append('totalPart', chunks)
      // fetchForm.append('GUID', file.uid)
      // that.$Fetch('video/upload', {method: 'post', body: jsObj, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, res => {
      // that.$Fetch('video/upload', {method: 'post', body: {MD5Key: file.md5, part: currentChunk, file: file, totalPart: chunks, GUID: file.uid}, headers: {'Content-Type': 'multipart/form-data'}}, res => {
      // that.$Fetch('video/upload', {method: 'post', body: {MD5Key: file.md5, part: currentChunk, file: file, totalPart: chunks, GUID: file.uid}}, res => {
      // that.$Fetch('video/upload', {method: 'post', body: fetchForm, headers: {'Content-Type': 'multipart/form-data'}}, res => {
      // that.$Fetch('video/upload', {method: 'post', body: fetchForm}, res => {
      // that.$Fetch('video/upload', {method: 'post', body: fetchForm})
      that.$Fetch(`video/checkPart/${file.md5}`, {method: 'post', body: {MD5Key: file.md5}})
        .then((res) => {
          // 后台返回没有上传过
          // if (res.msg === '分片已经存在') {
          if (res.data !== null) {
            console.log('执行分割文件')
            // 计算切割文件的开始索引和结束索引
            // 开始 = 当前片 * 一片的大小(4194304)
            var start = currentChunk * chunkSize
            var end = Math.min(start + chunkSize, file.size)
            // 切割文件并触发fileReader.onload
            fileReader.readAsArrayBuffer(file.slice(start, end))
            // 后台返回此块已经上传过，递归调用loadNext，继续判断下一块文件块
          } else {
            console.log('执行loadNext')
            currentChunk++
            if (currentChunk < chunks) {
              loadNext()
            }
          }
        })
        .catch(function (error) {
          console.log(error)
          if (error) {
            console.log(error.msg)
          }
        })
    }
    // 触发文件第一块上传
    loadNext()
  }
  // 获得文件md5
  function getFileMD5 (file, callback) {
    // 声明必要的变量
    var fileReader = new FileReader()
    // 文件每块分割4M，计算分割详情
    var chunkSize = 4194304
    var chunks = Math.ceil(file.size / chunkSize)
    var currentChunk = 0
    // 创建md5对象（基于SparkMD5）
    var spark = new SparkMD5()
    // 每块文件读取完毕之后的处理
    fileReader.onload = function (e) {
      // console.log(e.target.result)
      // 每块交由sparkMD5进行计算
      spark.appendBinary(e.target.result)
      currentChunk++
      // 如果文件处理完成计算MD5，如果还有分片继续处理
      if (currentChunk < chunks) {
        loadNext()
      } else {
        callback(spark.end())
      }
    }
    // 处理单片文件的上传
    function loadNext () {
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize
      console.log(start, end)
      fileReader.readAsBinaryString(file.slice(start, end))
    }
    loadNext()
  }
}
