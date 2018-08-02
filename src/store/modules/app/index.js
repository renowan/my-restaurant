import actions from './actions'
import mutations from './mutations'

// getters
const getters = {
  state: state => state,
  uid: state => state.userInfo ? state.userInfo.uid : null,
  isAppLoaded: state => state.isAppLoaded,
  serverTime: state => state.serverTime,
}

// initial state
const state = {
  isLogin: false,
  // ログイン処理中
  isOnLoginProcessing: false,
  isDebug: false,
  isLoading: false,
  userInfo: null,
  serverTime: null,
  isAppLoaded: false,
  uiLoadingList: [],
  taxRate: 1.08
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
