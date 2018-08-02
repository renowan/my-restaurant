import * as types from './mutationTypes'

export default {
  // 初期化
  [types.DETAIL_INIT] (state, list) {
    state.isSaved = false
  },
  // コースリスト
  [types.UPDATE_LIST] (state, list) {
    state.list = list
  },
  [types.UPDATE_IS_LOADED] (state, data) {
    state.isLoaded = data
  },
  [types.UPDATE_IS_CREATE_MODE] (state, data) {
    state.isCreateMode = data
  },
  [types.UPDATE_EDIT_DATA] (state, data) {
    state.editData = data
  },
  [types.UPDATE_IS_SAVED] (state, data) {
    state.isSaved = data
  },
  [types.GET_TAB_LIST] (state, data) {
    state.tabList = data
  },
  [types.GET_ALL_PRODUCT_LIST] (state, data) {
    state.productList = data.productList
    state.productObj = data.productObj
  },
  [types.UPDATE_DATA] (state, data) {
    state.data = data
  }
}
