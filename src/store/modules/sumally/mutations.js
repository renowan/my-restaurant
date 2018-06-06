import * as types from './mutationTypes'

export default {
  // do something
  [types.GET_MONTLY_RSV] (state, rsvList) {
    state.rsvList = rsvList
  },
  [types.CHART_DATA] (state, data) {
    state.chartData1 = data.chartData1
    state.chartData2 = data.chartData2
    state.chartData3 = data.chartData3
  },
  [types.UPDATE_YEAR_MONTH] (state, data) {
    state.yearMonth = data
  }
}
