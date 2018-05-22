import mutations from './mutations'
import actions from './actions'

const state = {
  // list: [],
  dateRange: []
}

const getters = {
  state: state => state,
  dateRange: state => state.dateRange
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
