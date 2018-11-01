import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import project from './modules/project'
import getters from './getters'
Vue.use(Vuex)
const state = {
  isLoading: false
}
const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
}
const index = new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    user,
    project
  }
})
export default index
