import * as types from './mutationTypes'

export default {
  // do something
  [types.UPDATE_LIST] (state, list) {
    state.list = list
  }
}
