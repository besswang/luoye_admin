
import * as types from '../mutation-types'
import api from '../../api'
const parentCategory = []
let searchAdverForm = {
  currentPage: 1, // 当前页
  pageSize: 10, // 一页有多少条
  title: '',
  type: ''
}
let adverList = {
  total: '',
  list: []
}
const state = {
  // userInfo
  parentCategory,
  searchAdverForm,
  adverList
}
const getters = {
  getParentCategory: state => state.parentCategory,
  getSearchAdverForm: state => state.searchAdverForm
}
const mutations = {
  [types.SAVE_PARENT_CATEGORY] (state, data) {
    let arr = []
    for (var i in data) {
      let c = {
        id: i,
        label: data[i]
      }
      arr.push(c)
    }
    state.parentCategory = [...arr]
  },
  [types.SAVE_ADVER_LIST] (state, data) {
    state.adverList.total = data.total
    state.adverList.list = [...data.list]
  }
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
  // 启用/禁用
  async bannerDisable ({commit}, params) {
    await api.bannerDisableApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 分类管理-是否禁用
  async categoryDisable ({commit}, params) {
    await api.categoryDisableApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 分类管理-是否推荐
  async categorySpread ({commit}, params) {
    await api.categorySpreadApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 父级分类
  async parentCategory ({commit}, params) {
    let res = await api.parentCategoryApi(params)
    commit(types.SAVE_PARENT_CATEGORY, res.data)
  },
  // 广告管理-是否禁用
  async advertDisable ({commit}, params) {
    await api.advertDisableApi(params)
    vm.$message({
      message: '操作成功',
      type: 'success'
    })
  },
  // 广告管理列表
  async advertList ({commit}, params) {
    let res = await api.advertListApi(params)
    commit(types.SAVE_ADVER_LIST, res.data)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
