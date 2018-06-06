import * as types from './mutationsTypes'

// actions
export default {
  [types.SET_IS_DEBUG] (state, data) {
    state.isDebug = true
    // state.isLogin = true
    state.isLoading = false
    state.isAppLoaded = true
  },
  [types.UPDATE_IS_LOGIN] (state, data) {
    state.isLogin = data
    if (!data) {
      state.userInfo = null
    }
  },
  [types.UPDATE_ISLOADING] (state, data) {
    state.isLoading = data
  },
  [types.UPDATE_USER_INFO] (state, user) {
    state.userInfo = {
      name: user.name,
      email: user.email,
      uid: user.uid,
    }
  },
  [types.UPDATE_SERVER_TIME] (state, data) {
    state.serverTime = data
  },
  // navi
  [types.APP_TOGGLE_NAVI] (state, data) {
    state.isNaviOpen = data
  },
  [types.UPDATE_IS_APP_LOADED] (state, data) {
    state.isAppLoaded = data
  },
  [types.UPDATE_UI_LOADING_LIST] (state, list) {
    state.uiLoadingList = list
  }
}
