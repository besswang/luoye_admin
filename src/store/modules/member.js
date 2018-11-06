
import * as types from '../mutation-types'
import api from '../../api'
// 会员列表
const memberList = {
  total: '',
  list: []
}
const category = [] // 视频分类
const categoryId = ''
const state = {
  memberList,
  category,
  categoryId
}
const getters = {
  getMemberList: state => state.memberList,
  getCategory: state => state.category,
  getCategoryId: state => state.categoryId
}
const mutations = {
  // 登陆后存储用户信息
  [types.SAVE_MEMBER_LIST] (state, data) {
    state.memberList.total = data.data.total
    state.memberList.list.push(data.data.list)
  },
  // 视频分类
  [types.SAVE_CATEGORY] (state, data) {
    let arr = []
    for (var i in data) {
      let c = {
        id: i,
        label: data[i]
      }
      arr.push(c)
    }
    state.category = [...arr]
  },
  [types.SAVE_CURRENT_CATEGORY] (state, data) {
    if (data.name !== null) {
      let obj = state.category.filter(val => {
        return val.label === data.name
      })
      console.log(obj)
      state.categoryId = obj[0].id
    } else {
      state.categoryId = ''
    }
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
    let res = await api.videoCategoryApi()
    commit(types.SAVE_CATEGORY, res.data)
    commit(types.SAVE_CURRENT_CATEGORY, params)
  },
  // 视频-是否推荐
  async videoSpread ({commit}, params) {
    await api.videoSpreadApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
