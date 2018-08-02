import mutations from './mutations'
import actions from './actions'

const state = {
  list: [],
  isLoaded: false,
  isCreateMode: false,
  editData: null,
  data: null,
  tabList: [],
  productList: [],
  productObj: {},
  isSaved: false
}

const getters = {
  state: state => state,
  list: state => state.list,
  data: state => state.data,
  editData: state => state.editData,
  tabList: state => state.tabList,
  productList: state => state.productList,
  productObj: state => state.productObj,
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
