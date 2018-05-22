import mutations from './mutations'
import actions from './actions'

const state = {
  saved: false,
  list: [],
  loading: []
}

const getters = {
  state: state => state,
  list: state => state.list
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
