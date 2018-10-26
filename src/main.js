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
// 把封装好的文件下载挂载到vue上
Vue.use(uploadFile)
Vue.use(ElementUI)
Vue.prototype.$Fetch = Fetch
Vue.config.productionTip = false
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
