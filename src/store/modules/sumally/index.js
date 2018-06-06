import mutations from './mutations'
import actions from './actions'

const state = {
  rsvList: [],
  yearMonth: '',
  chartData1: null,
  chartData2: null,
  chartData3: null,

}

const getters = {
  state: state => state,
  rsvList: state => state.rsvList,
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
