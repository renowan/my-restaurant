import * as types from './mutationTypes'

export default {
  // do something
  // [types.UPDATE_MONTH_RSV] (state, list) {
  //   state.list = list
  // },
  [types.UPDATE_DATE_RANGE] (state, dateRange) {
    state.dateRange = dateRange
  }
}
