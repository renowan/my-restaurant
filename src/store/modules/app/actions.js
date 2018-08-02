import moment from 'moment'
import { remove } from 'lodash'
import * as types from './mutationsTypes'
import { getDefaultData } from '@/common/constant/defaultData'
import * as firestoreQuery from '@/store/firestoreQuery.js'

moment.updateLocale('ja')

// actions
export default {
  // ユーザー存在するか
  getHasUserData ({commit, state, dispatch}, uid) {
    return new Promise((resolve, reject) => {
      firestoreQuery.getHasUserData(uid).then((response) => {
        resolve(response)
      })
    })
  },
  async autoLogin ({commit, state, dispatch}, user) {
    commit('UPDATE_ISLOADING', true)
    commit('UPDATE_USER_INFO', {
      uid: user.uid,
      name: user.displayName,
      email: user.email
    })

    let serverTime

    try {
      serverTime = await firestoreQuery.getServerTime()
    } catch (err) {
      console.log('catch err', err)
    }

    dispatch('updateServerTime', serverTime)
    // Loading
    commit('UPDATE_ISLOADING', false)
    // ログイン状態更新
    commit('UPDATE_IS_LOGIN', true)
    // app load完了
    commit('UPDATE_IS_APP_LOADED', true)
  },
  async login ({commit, state, dispatch}) {
    commit('UPDATE_IS_ON_LOGIN_PROCESSING', true)
    commit('UPDATE_ISLOADING', true)

    return new Promise((resolve, reject) => {
      let serverTime, loginResult

      Promise.all([
        firestoreQuery.getServerTime(),
        firestoreQuery.twitterAuth()
      ]).then((response) => {
        serverTime = response[0]
        loginResult = response[1]

        dispatch('updateServerTime', serverTime)

        const user = loginResult.user

        commit('UPDATE_USER_INFO', {
          uid: user.uid,
          name: user.displayName,
          email: user.email
        })

        // Loading
        commit('UPDATE_ISLOADING', false)
        // ログイン状態更新
        commit('UPDATE_IS_LOGIN', true)
        // app load完了
        commit('UPDATE_IS_APP_LOADED', true)

        resolve()
      })
    })
  },
  async loginOut ({commit, state, dispatch}) {
    commit('UPDATE_ISLOADING', true)

    try {
      await firestoreQuery.loginOut()
    } catch (err) {
      console.log('catch err', err)
    }
    commit('UPDATE_IS_ON_LOGIN_PROCESSING', false)
    commit('UPDATE_ISLOADING', false)
    commit('UPDATE_IS_LOGIN', false)
  },
  // ユーザーデータ生成
  createUser ({commit, state, dispatch}, user) {
    const uid = user.uid

    const userData = {
      name: user.displayName || '未設定',
      email: user.email || '',
    }

    const defaultTableData = getDefaultData('table')
    defaultTableData.name = 'デフォルトテーブル'

    commit('UPDATE_USER_INFO', {
      name: user.displayName || '未設定',
      uid: user.uid,
      email: user.email
    })

    Promise.all([
      firestoreQuery.getServerTime(),
      firestoreQuery.createUser(uid, userData),
      firestoreQuery.createTable(uid, defaultTableData),
      firestoreQuery.createTab(uid, { name: 'メイン', index: 0 })
    ]).then((response) => {
      dispatch('updateServerTime', response[0])
      // Loading
      commit('UPDATE_ISLOADING', false)
      // ログイン状態更新
      commit('UPDATE_IS_LOGIN', true)
      // app load完了
      commit('UPDATE_IS_APP_LOADED', true)
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
