import * as firestoreQuery from '@/store/firestoreQuery.js'
import * as types from './mutationTypes'

// const uid = 'I2CI15NBmrVMSjQIEEdHZLW7lCj1'

export default {
  async updateCurrentTab ({ commit, state, rootState }, tabIndex) {
    const uid = rootState.app.userInfo.uid
    // 一回リストをクリアする
    commit(types.UPDATE_PRODUCT_LIST, [])

    commit(types.UPDATE_CURRENT_TAB, tabIndex)
    const tabId = state.tabList[tabIndex].id

    commit('app/UPDATE_ISLOADING', true, { root: true })

    let itemList = []
    try {
      itemList = await firestoreQuery.getMenuItem(uid, tabId)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.UPDATE_PRODUCT_LIST, itemList)
    commit('app/UPDATE_ISLOADING', false, { root: true })
  },
  async getMenu ({ commit, state, rootState }, tabIdOrder) {
    const uid = rootState.app.userInfo.uid
    let tabList
    let itemList = []

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      tabList = await firestoreQuery.getMenuTab(uid)
    } catch (err) {
      console.log('catch err', err)
    }

    const myTabIdOrder = tabIdOrder
    const tabId = tabIdOrder ? myTabIdOrder : tabList[0].id

    try {
      itemList = await firestoreQuery.getMenuItem(uid, tabId)
    } catch (err) {
      console.log('catch err', err)
    }

    commit(types.UPDATE_TAB_LIST, tabList)
    commit(types.UPDATE_PRODUCT_LIST, itemList)
    commit('app/UPDATE_ISLOADING', false, { root: true })
  },

  // カテゴリリスト取得
  async getMenuTab ({ commit, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    commit('app/UPDATE_ISLOADING', true, { root: true })
    let tabList
    try {
      tabList = await firestoreQuery.getMenuTab(uid)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.UPDATE_TAB_LIST, tabList)
    commit('app/UPDATE_ISLOADING', false, { root: true })
  },

  // カテゴリ追加
  async createTab ({ commit, dispatch, state, rootState }, newTabName) {
    const uid = rootState.app.userInfo.uid
    const tab = { name: newTabName, index: 0 }

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.createTab(uid, tab)
    } catch (err) {
      console.log('catch err', err)
    }

    // カテゴリ最新情報
    dispatch('getMenuTab')
  },

  // カテゴリ名変更
  async updateTabName ({ commit, dispatch, state, rootState }, newTabName) {
    const uid = rootState.app.userInfo.uid
    const tabId = state.tabList[state.currentTab].id
    const tabObj = { name: newTabName }

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.updateTabName(uid, tabId, tabObj)
    } catch (err) {
      console.log('catch err', err)
    }
    // カテゴリ最新情報
    dispatch('getMenuTab')
  },

  // カテゴリ削除
  async deleteTab ({ commit, dispatch, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    const tabId = state.tabList[state.currentTab].id

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.deleteTab(uid, tabId)
    } catch (err) {
      console.log('catch err', err)
    }
    // カテゴリ最新情報
    dispatch('getMenuTab')
  },

  // 商品新規追加
  async addProduct ({ commit, dispatch, state, rootState }, product) {
    const uid = rootState.app.userInfo.uid
    const tabId = state.tabList[state.currentTab].id

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.addProduct(uid, tabId, product)
    } catch (err) {
      console.log('catch err', err)
    }

    dispatch('getMenu', tabId)
  },

  // 商品更新
  async updateProduct ({ commit, dispatch, state, rootState }, product) {
    const uid = rootState.app.userInfo.uid
    const tabId = state.tabList[state.currentTab].id

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.updateProduct(uid, tabId, product)
    } catch (err) {
      console.log('catch err', err)
    }
    dispatch('getMenu', tabId)
  },

  // 商品削除
  async deleteProduct ({ commit, dispatch, state, rootState }, productId) {
    const uid = rootState.app.userInfo.uid
    const tabId = state.tabList[state.currentTab].id

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.deleteProduct(uid, tabId, productId)
    } catch (err) {
      console.log('catch err', err)
    }

    dispatch('getMenu', tabId)
  }
}
