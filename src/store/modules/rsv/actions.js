import { cloneDeep } from 'lodash'
// import * as types from './mutationTypes'

const firebase = window.firebase
const db = firebase.firestore()

export default {
  // メッセージ定型文一覧の取得
  getRsvByDate ({ commit, state, rootState }, order) {
    const { date, isShowLoading } = order
    // loading処理
    if (isShowLoading) commit('app/UPDATE_ISLOADING', true, { root: true })
    commit('UPDATE_DATE', date)
    const uid = rootState.app.userInfo.uid
    const yyyymm = date.slice(0, 6)
    const rsvRef = db.collection(`users/${uid}/db/${yyyymm}/rsv`)
    const queryRef = rsvRef.where('date', '==', Number(date)).orderBy('createdAt')

    const list = []
    queryRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const obj = Object.assign({}, { id: doc.id }, doc.data())
        list.push(obj)
      })
      commit('UPDATE_LIST', list)
      if (isShowLoading) commit('app/UPDATE_ISLOADING', false, { root: true })
    })
  },

  createRsv ({ commit, state, rootState }, rsv) {
    commit('app/UPDATE_ISLOADING', true, { root: true })
    commit('UPDATE_SAVED', false)
    const uid = rootState.app.userInfo.uid
    const yyyymm = String(rsv.date).slice(0, 6)

    // タイムスタンプ追加
    rsv.createdAt = firebase.firestore.FieldValue.serverTimestamp()

    db.collection(`users/${uid}/db/${yyyymm}/rsv`).add(rsv).then((doc) => {
      commit('app/UPDATE_ISLOADING', false, { root: true })
      commit('UPDATE_SAVED', true)
    })
  },

  delete ({ commit, dispatch, state, rootState }, rsv) {
    const uid = rootState.app.userInfo.uid
    const id = rsv.id
    const rsvyyyymm = String(rsv.date).slice(0, 6)
    db.doc(`users/${uid}/db/${rsvyyyymm}/rsv/${id}`).delete().then((doc) => {
      commit('app/UPDATE_ISLOADING', false, { root: true })
      dispatch('getRsvByDate', { date: state.date, isShowLoading: true })
    })
  },

  updateDragItem ({ commit, dispatch, state, rootState }, order) {
    const { id, start, long } = order
    const list = cloneDeep(state.list)
    let targetRsv = null
    let isSame = true
    const newList = list.map((rsv) => {
      if (rsv.id === id) {
        if (rsv.start !== start || rsv.long !== long) {
          isSame = false
          rsv = Object.assign(rsv, order)
          targetRsv = rsv
        }
      }
      return rsv
    })

    if (isSame) return

    const postRsv = Object.assign(targetRsv, order)
    dispatch('update', postRsv)
    commit('UPDATE_LIST', newList)
  },

  update ({ commit, dispatch, state, rootState }, rsv) {
    // idが不明の場合は実行しない
    if (!rsv.id) return

    commit('UPDATE_SAVED', false)
    const uid = rootState.app.userInfo.uid
    const id = rsv.id

    // loading処理
    dispatch('app/addUiLoadingList', {
      action: 'add',
      id
    }, { root: true })

    // 予約の年月
    const rsvyyyymm = String(rsv.date).slice(0, 6)
    // ページ表示中の年月
    const pageyyyymm = state.date.slice(0, 6)
    if (rsvyyyymm === pageyyyymm) {
      delete rsv.id
      // 同じ年月での更新
      db.doc(`users/${uid}/db/${rsvyyyymm}/rsv/${id}`).set(rsv).then((doc) => {
        commit('UPDATE_SAVED', true)
        dispatch('app/addUiLoadingList', {
          action: 'remove',
          id
        }, { root: true })
      })
    } else {
      // 年月跨ぐ処理
      const originRsv = Object.assign({}, rsv)
      originRsv.date = Number(state.date)

      // 年月がかわる保存なのでもとを消して新規登録
      dispatch('createRsv', rsv).then(() => {
        dispatch('delete', originRsv).then(() => {
          dispatch('getRsvByDate', { date: state.date, isShowLoading: false }).then(() => {
            console.log('addUiLoadingList remove')
            // loading処理
            dispatch('app/addUiLoadingList', {
              action: 'remove',
              id
            }, { root: true })
          })
        })
      })
    }
  },
}
