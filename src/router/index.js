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
          path: '/video/list',
          component: components('video/List')
        }
      ]
    }
  ]
})
