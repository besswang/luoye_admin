// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Fetch from './fetch/index.js'
// Import upload
import uploadFile from './assets/js/uploadFile'
import global from './assets/js/global'
// 把封装好的文件下载挂载到vue上
Vue.use(uploadFile)
Vue.use(ElementUI)
Vue.prototype.$Fetch = Fetch
Vue.prototype.$global = global
Vue.config.productionTip = false

// 封装接口-start
// let axiosIns = axios.create({
//   headers: {
//     //"Content-Type":"application/x-www-form-urlencoded"
//     // "Content-Type":"application/json"
//   },
// });
// axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
// axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
// axiosIns.defaults.responseType = 'json'
// axiosIns.defaults.transformRequest = [function (data) {
//   // 数据序列化
//   // return JSON.stringify(data)
//   return qs.stringify(data);
// }
// ];
// axiosIns.defaults.validateStatus = function (status) {
//   return true
// }
// axiosIns.interceptors.request.use(function (config) {
//   // 配置config
//   // config.headers.Accept = 'application/json';
//   // config.headers.Accept = 'application/x-www-form-urlencoded';
//   return config
// })
// axiosIns.interceptors.response.use(function (response) {
//   let data = response.data
//   let status = response.status
//   if (status === 200) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(response)
//   }
// })
// let ajaxMethod = ['get', 'post']
// let api = {}
// ajaxMethod.forEach((method)=> {
//   // 数组取值的两种方式
//   api[method] = function (uri, data, config) {
//     return new Promise(function (resolve, reject) {
//       axiosIns[method](uri, data, config).then((response) => {
//         /* 根据后台数据进行处理
//          *1 code===200   正常数据+错误数据     code!==200   网络异常等
//          *2 code===200   正常数据     code!==200   错误数据+网络异常等
//          * 这里使用的是第一种方式
//          * ......
//          */
//         // if (response.data.code == 'UNAUTHORIZED') {
//         //   Message({
//         //     message:response.data.remark,
//         //     type:"warning"
//         //   })
//         //   setTimeout(() => {
//         //     window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/login'
//         //   }, 3000);
//           // toast封装：  参考ele-mint-ui
//           // Toast({
//           //     message: response.data.Message,
//           //     position: 'top',
//           //     duration: 2000
//           // });
//           // if (response.data.Message === '未登录') {
//           //     Toast({
//           //         message: response.data.Message,
//           //         position: '',
//           //         duration: 2000
//           //     });
//           //     //使用vue实例做出对应行为  change state or router
//           //     //instance.$store.commit('isLoginShow',true)
//           // }
//         // }else {
//           resolve(response)
//         // }

//       })
//       .catch((response) => {
//         // reject response
//       })
//     })
//   }
// })
// Vue.prototype.$axios = api
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
