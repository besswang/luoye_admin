
import * as types from '../mutation-types'
import api from '../../api'
// 会员列表
const memberList = {}
const category = [] // 视频分类
const state = {
  memberList,
  category
}
const getters = {
  getMemberList: state => state.memberList,
  getCategory: state => state.category
}
const mutations = {
  // 登陆后存储用户信息
  [types.SAVE_MEMBER_LIST] (state, data) {
    state.memberList = data.data
  },
  // 视频分类
  [types.SAVE_CATEGORY] (state, data) {
    console.log('guo')
    console.log(data)
    let arr = []
    for (var i in data) {
      let c = {
        id: i,
        label: data[i]
      }
      arr.push(c)
    }
    state.category = [...arr]
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
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 视频-禁用/启用
  async videoDisable ({commit}, params) {
    await api.videoDisableApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 视频-分类
  async videoCategory ({commit}, params) {
    let res = await api.videoCategoryApi(params)
    commit(types.SAVE_CATEGORY, res.data)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
