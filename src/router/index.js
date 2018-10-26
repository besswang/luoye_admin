import Vue from 'vue'
import Router from 'vue-router'
const components = name => resolve => require.ensure([], () => resolve(require(`@/components/${name}`)))
Vue.use(Router)
export default new Router({
  mode: 'history', // 去掉路由中的#号
  routes: [
    {
      path: '/',
      name: 'Login',
      component: components('user/Login')
    },
    {
      path: '/forget',
      name: 'Forget',
      component: components('user/Forget')
    },
    {
      path: '/register',
      name: 'Register',
      component: components('user/Register')
    },
    {
      path: '/main',
      name: 'Main',
      component: components('common/Main'),
      children: [
        {
          path: '/',
          component: components('video/Vlist')
        },
        {
          path: '/video/list',
          component: components('video/Vlist')
        },
        {// 添加视频
          path: '/video/addvlist',
          name: 'AddVlist',
          component: components('video/AddVlist')
        },
        {
          path: '/member/list',
          component: components('member/Mlist')
        },
        {
          path: '/member/add/:id',
          name: 'Add',
          component: components('member/Add')
        },
        {
          path: '/operation/bannerlist',
          component: components('operation/BannerList')
        },
        {
          path: '/operation/banadd/:id',
          name: 'BanAdd',
          component: components('operation/BanAdd')
        },
        {
          path: '/operation/classify',
          name: 'Classify',
          component: components('operation/Classify')
        }
      ]
    }
  ]
})
