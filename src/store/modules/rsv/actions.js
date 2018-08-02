import * as firestoreQuery from '@/store/firestoreQuery.js'
import { cloneDeep } from 'lodash'
import * as types from './mutationTypes'

const firebase = window.firebase
const db = firebase.firestore()

export default {
  // 指定日付の予約を取得
  async getRsvByDate ({ commit, state, rootState }, order) {
    const { date, isShowLoading } = order

    // loading処理
    if (isShowLoading) commit('app/UPDATE_ISLOADING', true, { root: true })

    // 日付更新
    commit(types.UPDATE_DATE, date)

    const uid = rootState.app.userInfo.uid
    const yyyymm = date.slice(0, 6)

    Promise.all([
      firestoreQuery.getRsvByDate(uid, yyyymm, date),
      firestoreQuery.getTableList(uid),
      firestoreQuery.getCourse(uid),
      firestoreQuery.getAllProduct(uid),
    ]).then((response) => {
      commit('table/UPDATE_LIST', response[1], { root: true })
      commit('course/UPDATE_LIST', response[2], { root: true })
      commit('course/GET_ALL_PRODUCT_LIST', response[3], { root: true })
      commit(types.UPDATE_LIST, response[0])
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
      commit(types.UPDATE_SAVED, true)
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

  updateDragItem ({ commit, dispatch, state, rootState }, orderRsv) {
    const { id } = orderRsv
    const list = cloneDeep(state.list)
    const targetRsv = list.filter((rsv) => rsv.id === id)[0]
    const updatedRsv = Object.assign(targetRsv, orderRsv)
    const hasChange = JSON.stringify(targetRsv) === JSON.stringify(updatedRsv)
    // console.log('targetRsv', targetRsv)
    // console.log('updatedRsv', updatedRsv)
    // console.log('hasChange', hasChange)

    if (!hasChange) return

    dispatch('updateRealTime', cloneDeep(updatedRsv))
    dispatch('update', updatedRsv)
  },

  // サーバー送信する前に、クライアント側のrsvListを更新
  updateRealTime ({ commit, dispatch, state, rootState }, orderRsv) {
    const list = cloneDeep(state.list)
    let hasChange = false
    const newList = list.map((rsv) => {
      if (rsv.id === orderRsv.id) {
        hasChange = JSON.stringify(rsv) !== JSON.stringify(orderRsv)
        return orderRsv
      } else {
        return rsv
      }
    })
    if (hasChange) commit('UPDATE_LIST', newList)
  },

  update ({ commit, dispatch, state, rootState }, orderRsv) {
    const rsv = cloneDeep(orderRsv)
    dispatch('updateRealTime', cloneDeep(orderRsv))

    // idが不明の場合は実行しない
    if (!rsv.id) return

    // 保存完了フラグを下げる
    commit('UPDATE_SAVED', false)

    // 必要な情報
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
