
import * as types from '../mutation-types'
import api from '../../api'
const parentCategory = []
const searchAdverForm = {
  currentPage: 1, // 当前页
  pageSize: 10, // 一页有多少条
  title: '',
  type: ''
}
const adverList = {
  total: '',
  list: []
}
// const editAdver = {
//   content: '',
//   iconUrl: '',
//   id: 0,
//   link: '',
//   title: ''
// }
const editAdver = {}
const state = {
  // userInfo
  parentCategory,
  searchAdverForm,
  adverList,
  editAdver
}
const getters = {
  getParentCategory: state => state.parentCategory,
  getSearchAdverForm: state => state.searchAdverForm,
  getEditAdver: state => state.editAdver
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
  },
  [types.SAVE_EDIT_ADVER] (state, data) {
    state.editAdver = Object.assign({}, data, {httpUrl: data.iconUrl})
  },
  [types.SAVE_IMG_ADVER] (state, res) {
    state.editAdver.iconUrl = res.data.iconUrl
    state.editAdver.httpUrl = res.data.viewUrl
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
  },
  // 广告管理-添加
  addAdverFn ({commit}) {
    vm.$router.push('/operation/advertadd')
    commit(types.SAVE_EDIT_ADVER, {id: '', type: 1})
  },
  // 广告管理-编辑
  editAdverFn ({commit}, row) {
    vm.$router.push('/operation/advertadd')
    commit(types.SAVE_EDIT_ADVER, row)
  },
  // 广告管理-编辑-保存
  async saveAdvert ({commit, state}) {
    if (state.editAdver.id) {
      await api.advertEditApi(state.editAdver)
      vm.$message({
        message: '修改成功',
        type: 'success'
      })
    } else {
      let startTime = Date.parse(state.editAdver.time[0])
      let endTime = Date.parse(state.editAdver.time[1])
      state.editAdver = Object.assign(state.editAdver, {startTime: startTime}, {endTime: endTime})
      console.log(state.editAdver)
      await api.advertAddApi(state.editAdver)
      vm.$message({
        message: '添加成功',
        type: 'success'
      })
    }
    setTimeout(() => {
      vm.$router.push('/operation/advertising')
    }, 800)
  },
  // 广告管理-删除
  async advertRemove ({dispatch, commit, state}, obj) {
    await api.advertRemoveApi(obj.id)
    obj.rows.splice(obj.index, 1)
    vm.$message({
      message: '删除成功',
      type: 'success'
    })
    setTimeout(() => {
      dispatch('advertList', state.searchAdverForm)
    }, 800)
  },
  handleAvatarSuccess ({commit}, res) {
    if (res.code === 200) {
      commit(types.SAVE_IMG_ADVER, res)
    } else {
      vm.$message({
        message: res.msg,
        type: 'warning'
      })
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
