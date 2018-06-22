import * as types from './mutationTypes'

export default {
  // カテゴリ更新
  [types.UPDATE_TAB_LIST] (state, tabList) {
    state.tabList = tabList
  },
  // [types.UPDATE_MENU_ITEM] (state, data) {
  //   const { tabId, itemList } = data
  //   state.itemCollection[tabId] = itemList
  // },
  [types.UPDATE_CURRENT_TAB] (state, currentTab) {
    state.currentTab = currentTab
  },
  [types.UPDATE_PRODUCT_LIST] (state, productList) {
    state.productList = productList
  },
}
