import * as types from './mutationTypes'

export default {
  // コースリスト
  [types.UPDATE_LIST] (state, list) {
    state.list = list
    state.isLoaded = true
  },
  [types.UPDATE_IS_CREATE_MODE] (state, data) {
    this.isCreateMode = data
  },
  [types.UPDATE_EDIT_DATA] (state, data) {
    this.editData = data
  }
}
