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
    {// 修改密码
      path: '/amend',
      name: 'Amend',
      component: components('user/Amend')
    },
    {
      path: '/register',
      name: 'Register',
      component: components('user/Register')
    },
    {
      path: '/main',
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
        {// 添加视频weuuploader
          path: '/video/addvlistweb',
          name: 'AddVlistweb',
          component: components('video/AddVlistWeb')
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
        },
        {
          path: '/operation/invite', // 邀请好友
          name: 'Invite',
          component: components('operation/Invite')
        },
        {
          path: '/operation/wd', // 观看和下载
          name: 'Wd',
          component: components('operation/Wd')
        },
        {
          path: '/operation/wd/issue', // 手工发放次数
          name: 'Issue',
          component: components('operation/WdIssue')
        },
        {
          path: '/operation/domain', // 域名管理
          name: 'Domain',
          component: components('operation/Domain')
        },
        {
          path: '/operation/basic', // 基础定义
          name: 'Basic',
          component: components('operation/Basic')
        }
      ]
    }
  ]
})
