
import * as types from '../mutation-types'
import api from '../../api'
// import { MESSAGE } from '../../components/meta/meta'
// 会员列表-父级分类
const parentCategory = []
// 广告管理-分页/搜索信息
const searchAdverForm = {
  currentPage: 1, // 当前页
  pageSize: 10, // 一页有多少条
  title: '',
  type: ''
}
// 广告管理-列表
const adverList = {
  total: '',
  list: []
}
// 广告管理-编辑/添加表单
const editAdver = {}
const state = {
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
  // 广告管理-添加
  [types.SAVE_ADD_ADVER] (state, data) {
    state.editAdver = Object.assign({}, data, {iconUrl: ''}, {httpUrl: ''})
  },
  // 广告管理-编辑
  // (注意iconUrl在没有修改图片的时候，iconUrl为空，在调用接口的时候就可以过滤掉iconUrl，不做提交，图片路径就不会出错，
  // 否则，data里的iconURL是http路径，会做重复提交，返回list的图片路径就会出错)
  [types.SAVE_EDIT_ADVER] (state, data) {
    state.editAdver = Object.assign({}, data, {iconUrl: ''}, {httpUrl: data.iconUrl}, {time: [data.startTime, data.endTime]})
  },
  [types.SAVE_IMG_ADVER] (state, res) {
    state.editAdver.iconUrl = res.data.iconUrl
    state.editAdver.httpUrl = res.data.viewUrl
  }
}
const actions = {
  /* global vm */
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
    // commit(types.SAVE_EDIT_ADVER, {id: '', type: 1}, {time: []})
    commit(types.SAVE_ADD_ADVER, {id: '', type: 1})
  },
  // 广告管理-编辑
  editAdverFn ({commit}, row) {
    vm.$router.push('/operation/advertadd')
    commit(types.SAVE_EDIT_ADVER, row)
  },
  // 广告管理-编辑-保存
  async saveAdvert ({commit, state}) {
    let startTime = Date.parse(state.editAdver.time[0])
    let endTime = Date.parse(state.editAdver.time[1])
    state.editAdver = Object.assign(state.editAdver, {startTime: startTime}, {endTime: endTime})
    if (state.editAdver.id) {
      let pam = {}
      for (let i in state.editAdver) {
        if (state.editAdver[i]) {
          pam[i] = state.editAdver[i]
        }
      }
      await api.advertEditApi(pam)
      vm.$message({
        message: '修改成功',
        type: 'success'
      })
    } else {
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
  // 广告管理-图片上传
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
