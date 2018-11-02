
import * as types from '../mutation-types'
import api from '../../api'
// 会员列表
const memberList = {}
const state = {
  memberList
}
const getters = {
  getMemberList: state => state.memberList
}
const mutations = {
  // 登陆后存储用户信息
  [types.SAVE_MEMBER_LIST] (state, data) {
    state.memberList = data.data
  }
}
const actions = {
  // 添加会员
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
    let res = await api.userListApi(params)
    commit(types.SAVE_MEMBER_LIST, res)
  },
  // 改变冻结状态
  async disableStatus ({commit}, params) {
    await api.disableStatusApi(params)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
