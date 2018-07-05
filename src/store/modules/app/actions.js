import moment from 'moment'
import axios from 'axios'
import { remove } from 'lodash'
import * as types from './mutationsTypes'
import { getDefaultData } from '@/common/constant/defaultData'

moment.updateLocale('ja')

const firebase = window.firebase
const db = firebase.firestore()
const provider = new firebase.auth.TwitterAuthProvider()

// actions
export default {
  login ({commit, state, dispatch}, order) {
    commit('UPDATE_ISLOADING', true)
    return new Promise((resolve, reject) => {
      if (order) {
        console.log('メールログイン')
        const { mail, password } = order
        firebase.auth().signInWithEmailAndPassword(mail, password).then((result) => {
          commit('UPDATE_IS_LOGIN', true)
          commit('UPDATE_ISLOADING', false)
          resolve()
        }).catch((error) => {
          console.log('error', error)
        })
      } else {
        console.log('ソーシャルログイン')
        firebase.auth().signInWithPopup(provider).then((result) => {
          commit('UPDATE_IS_LOGIN', true)
          commit('UPDATE_ISLOADING', false)
          resolve()
        }).catch((error) => {
          console.log('error', error)
        })
      }
    })
  },
  loginOut ({commit, state, dispatch}) {
    commit('UPDATE_IS_LOGIN', true)
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        commit('UPDATE_IS_LOGIN', false)
        resolve()
      }).catch((error) => {
        console.log('error', error)
      })
    })
  },
  appInit ({commit, state, dispatch}, user) {
    // commit('UPDATE_USER_INFO', user)
    db.doc('users/' + user.uid).get().then((qs) => {
      if (qs.exists) {
        console.log('存在')
        dispatch('loadAllData', user.uid)
        return null
      } else {
        // ユーザー存在しない
        console.log('ユーザー存在しない')
        dispatch('createUser', user)
      }
    })
  },
  // ユーザーデータ生成
  createUser ({commit, state, dispatch}, user) {
    const userRef = db.doc('users/' + user.uid).set({
      name: user.displayName || '未設定',
      email: user.email || '',
      serverTime: firebase.firestore.FieldValue.serverTimestamp()
    })
    const defaultTableData = getDefaultData('table')
    defaultTableData.name = 'デフォルトテーブル'
    defaultTableData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const tableRef = db.collection('users').doc(user.uid).collection('table').add(defaultTableData)
    // const courseRef = db.collection('users').doc(user.uid).collection('course').add({
    //   name: 'デフォルトコース',
    //   menu: {
    //     drink: [],
    //     food: []
    //   },
    //   price: 3000,
    //   minNum: 1,
    //   maxNum: 4,
    // })
    const tabRef = db.collection(`users/${user.uid}/menu`).add({ name: 'メイン' })

    Promise.all([userRef, tableRef, tabRef]).then((response) => {
      dispatch('loadAllData', user.uid)
    })
  },
  loadAllData ({commit, state, dispatch}, uid) {
    const getServerTime = () => {
      return axios.get('https://us-central1-myrestaurant-4b36a.cloudfunctions.net/getServerTime')
    }
    const userGet = db.doc(`users/${uid}`).get()
    const tableGet = db.collection(`users/${uid}/table`).orderBy('createdAt', 'desc').get()
    // const courseGet = db.collection(`users/${uid}/course`).get()
    Promise.all([getServerTime(), userGet, tableGet]).then((response) => {
      // サーバー時間
      const serverTime = response[0].data.time
      dispatch('updateServerTime', serverTime)

      // ユーザー処理
      const userQs = response[1]
      const userData = userQs.data()
      userData.uid = uid
      commit('UPDATE_USER_INFO', userData)

      // テーブル処理
      const tableQs = response[2]
      const tableList = []
      tableQs.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id
        tableList.push(data)
      })
      commit('table/UPDATE_LIST', tableList, {root: true})

      // course処理
      // const courseQs = response[3]
      // const courseList = []
      // courseQs.forEach((doc) => {
      //   const data = doc.data()
      //   data.id = doc.id
      //   courseList.push(data)
      // })
      // commit('course/UPDATE_LIST', courseList, {root: true})

      // isAppLoaded = true
      commit('UPDATE_IS_APP_LOADED', true)

      // isLoadingを落とす
      commit('UPDATE_ISLOADING', false)
    })
  },
  updateServerTime ({commit, state}, serverTime) {
    const date = moment(serverTime)
    const dateObj = {
      yyyymmdd: date.format('YYYYMMDD'),
      yyyymm: date.format('YYYYMM'),
      milliseconds: date.valueOf(),
    }
    commit(types.UPDATE_SERVER_TIME, dateObj)
  },
  addUiLoadingList ({commit, state}, order) {
    const { action, id } = order
    let uiLoadingList = state.uiLoadingList.slice(0)
    if (action === 'add') {
      uiLoadingList.push(id)
    } else {
      uiLoadingList = remove((elm) => elm === id)
    }
    commit(types.UPDATE_UI_LOADING_LIST, uiLoadingList)
  }
}
