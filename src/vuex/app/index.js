import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './action'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

// 每个文件都写了例子
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
