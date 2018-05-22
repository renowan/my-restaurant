import * as types from './mutationTypes'
// import { cloneDeep } from 'lodash'

export default {
  // do something
  [types.UPDATE_LIST] (state, list) {
    state.list = list
  },
  [types.UPDATE_SAVED] (state, data) {
    state.saved = data
  },
  [types.UPDATE_DATE] (state, date) {
    state.date = date
  },
  [types.UPDATE_IS_LIST] (state, date) {
    state.isList = date
  }
}
