import mutations from './mutations'
import actions from './actions'

const state = {
  list: [],
  isLoaded: false,
  isCreateMode: false,
  editData: null
}

const getters = {
  state: state => state,
  list: state => state.list,
  editData: state => state.editData
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
