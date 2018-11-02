
// import * as types from '../mutation-types'
import api from '../../api'
// 登陆后的用户数据
// const userInfo = {
//   nickName: '',
//   token: ''
// }
const state = {
  // userInfo
}
const mutations = {
  // 登陆后存储用户信息
  // [types.SAVE_USER] (state, data) {
  //   state.userInfo = data.data
  //   window.sessionStorage.setItem('token', data.data.token)
  //   window.sessionStorage.setItem('nickName', data.data.nickName)
  // }
}
const actions = {
  // 邀请列表
  async add ({commit}, params) {
    await api.addApi(params)
    /* global vm */
    vm.$message({
      message: '添加成功',
      type: 'success'
    })
    setTimeout(() => {
      vm.$router.push('/member/list')
    }, 800)
  },
  // 会员列表
  async userList ({commit}, params) {
    await api.userListApi(params)
    /* global vm */
    // vm.$message({
    //   message: '添加成功',
    //   type: 'success'
    // })
    // setTimeout(() => {
    //   vm.$router.push('/member/list')
    // }, 800)
  }
}
export default {
  state,
  mutations,
  actions
}
