import * as types from './mutationTypes'
import * as firestoreQuery from '@/store/firestoreQuery.js'

export default {
  // メッセージ定型文一覧の取得
  updateListBySnap ({ commit, state }, list) {
    console.log('list', list)
  },
  async getTable ({ commit, state, rootState }, isShowLoading = true) {
    const uid = rootState.app.userInfo.uid

    if (isShowLoading) commit('app/UPDATE_ISLOADING', true, { root: true })

    let list

    try {
      list = await firestoreQuery.getTableList(uid)
    } catch (err) {
      console.log('catch err', err)
    }

    commit(types.UPDATE_LIST, list)

    if (isShowLoading) commit('app/UPDATE_ISLOADING', false, { root: true })
  },
  // テーブル作成
  async create ({ commit, state, rootState, dispatch }, table) {
    commit('app/UPDATE_ISLOADING', true, { root: true })
    commit(types.UPDATE_SAVED, false)
    const uid = rootState.app.userInfo.uid

    try {
      await firestoreQuery.createTable(uid, table)
    } catch (err) {
      console.log('catch err', err)
    }

    dispatch('getTable', true)
  },
  async update ({ commit, state, rootState, dispatch }, table) {
    const uid = rootState.app.userInfo.uid
    const id = table.id
    delete table.id

    // loading処理
    dispatch('app/addUiLoadingList', {
      action: 'add',
      id
    }, { root: true })

    try {
      await firestoreQuery.updateTable(uid, id, table)
    } catch (err) {
      console.log('catch err', err)
    }

    let list

    try {
      list = await firestoreQuery.getTableList(uid)
    } catch (err) {
      console.log('catch err', err)
    }

    commit(types.UPDATE_LIST, list)

    dispatch('app/addUiLoadingList', {
      action: 'remove',
      id
    }, { root: true })
  },
  async delete ({ commit, state, rootState, dispatch }, id) {
    commit('app/UPDATE_ISLOADING', true, { root: true })
    const uid = rootState.app.userInfo.uid

    try {
      await firestoreQuery.deleteTable(uid, id)
    } catch (err) {
      console.log('catch err', err)
    }

    dispatch('getTable', true)
  }
}
