import mutations from './mutations'
import actions from './actions'

const state = {
  // ロードが終わったか
  isLoaded: false,

  // カテゴリ
  tabList: [],

  // 表示中のカテゴリ
  currentTab: 0,

  // 商品リスト
  productList: [],

  // カテゴリ別のアイテム
  itemCollection: {},

  // 編集画面で保存終了
  isSaved: false
}

const getters = {
  state: state => state,
  tabList: state => state.tabList,
  currentTab: state => state.currentTab,
  productList: state => state.productList,
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
