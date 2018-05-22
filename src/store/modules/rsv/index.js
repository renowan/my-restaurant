import mutations from './mutations'
import actions from './actions'

const state = {
  list: [],
  listBk: [],
  date: '',
  saved: false,
  tableMap: [],
  isList: true
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
