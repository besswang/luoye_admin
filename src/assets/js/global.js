export default {
  // 手机号
  valiTel: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('手机号不能为空'))
    }
    setTimeout(() => {
      let tel = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!tel.test(value)) {
        callback(new Error('请输入有效的手机号'))
      } else {
        callback()
      }
    }, 1000)
  },
  // 密码
  valiPass: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  },
  // 时间戳格式化
  formatDate: (date, fmt) => {
    if (/(y+)/.test(fmt) || /(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'D+': date.getDate(),
      'h+': date.getHours(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }
}
