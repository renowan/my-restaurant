import * as types from './mutationTypes'

const firebase = window.firebase
const db = firebase.firestore()

export default {
  // メッセージ定型文一覧の取得
  updateListBySnap ({ commit, state }, list) {
    console.log('list', list)
  },
  getTable ({ commit, state, rootState }, isShowLoading = true) {
    const uid = rootState.app.userInfo.uid
    if (isShowLoading) commit('app/UPDATE_ISLOADING', true, { root: true })
    db.collection(`users/${uid}/table`).orderBy('createdAt', 'desc').get().then((response) => {
      const tableList = []
      response.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        tableList.push(data)
      })
      commit('table/UPDATE_LIST', tableList, {root: true})
      if (isShowLoading) commit('app/UPDATE_ISLOADING', false, { root: true })
    })
  },
  // テーブル作成
  create ({ commit, state, rootState, dispatch }, table) {
    commit('app/UPDATE_ISLOADING', true, { root: true })
    commit(types.UPDATE_SAVED, false)
    const uid = rootState.app.userInfo.uid

    // タイムスタンプ追加
    table.createdAt = firebase.firestore.FieldValue.serverTimestamp()

    db.collection(`users/${uid}/table`).add(table).then((doc) => {
      commit('app/UPDATE_ISLOADING', false, { root: true })
      commit(types.UPDATE_SAVED, true)
      dispatch('getTable')
    })
  },
  update ({ commit, state, rootState, dispatch }, table) {
    const uid = rootState.app.userInfo.uid
    const id = table.id
    delete table.id

    // loading処理
    dispatch('app/addUiLoadingList', {
      action: 'add',
      id
    }, { root: true })

    db.doc(`users/${uid}/table/${id}`).set(table).then((doc) => {
      // リスト再取得
      dispatch('getTable', false).then(() => {
        // loading処理
        dispatch('app/addUiLoadingList', {
          action: 'remove',
          id
        }, { root: true })
      })
    })
  },
  delete ({ commit, state, rootState, dispatch }, id) {
    commit('app/UPDATE_ISLOADING', true, { root: true })
    const uid = rootState.app.userInfo.uid
    db.doc(`users/${uid}/table/${id}`).delete().then((doc) => {
      commit('app/UPDATE_ISLOADING', false, { root: true })
      dispatch('getTable')
    })
  }
}
