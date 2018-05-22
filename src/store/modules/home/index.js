import mutations from './mutations'
import actions from './actions'

const state = {
  // ロードが終わったか
  isLoaded: false,

  // 編集画面で保存終了
  isSaved: false
}

const getters = {
  state: state => state,
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
