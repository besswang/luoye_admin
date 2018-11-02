
import * as types from '../mutation-types'
import api from '../../api'
// 登陆后的用户数据
const userInfo = {
  nickName: '',
  token: ''
}
const state = {
  userInfo
}
const mutations = {
  // 登陆后存储用户信息
  [types.SAVE_USER] (state, data) {
    state.userInfo = data.data
    window.sessionStorage.setItem('token', data.data.token)
    window.sessionStorage.setItem('nickName', data.data.nickName)
  }
  // 登出
}
const actions = {
  // 登陆
  async login ({commit}, params) {
    let res = await api.loginApi(params)
    commit(types.SAVE_USER, res)
    /* global vm */
    vm.$message({
      message: '登陆成功',
      type: 'success'
    })
    setTimeout(() => {
      vm.$router.push('/main')
    }, 800)
  },
  // 退出
  async logout ({commit}) {
    await api.logoutApi()
    let userInfo = {
      data: {
        nickName: '',
        token: ''
      }
    }
    commit(types.SAVE_USER, userInfo)
    vm.$router.push('/')
  },
  // 修改密码
  async amendFn ({commit}, params) {
    await api.passwordApi(params)
    vm.$message({
      message: '修改成功',
      type: 'success'
    })
    setTimeout(() => {
      vm.$router.push('/')
    }, 800)
  }
}
export default {
  state,
  mutations,
  actions
}
