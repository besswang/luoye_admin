// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex' // 引入状态管理
import store from './store/index.js'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Fetch from './fetch/index.js'
import global from './assets/js/global'
// 把封装好的文件下载挂载到vue上
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$Fetch = Fetch
Vue.prototype.$global = global
Vue.config.productionTip = false
/* eslint no-undef: "error" */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
