import * as firestoreQuery from '@/store/firestoreQuery.js'
import * as types from './mutationTypes'
import { cloneDeep } from 'lodash'

export default {
  // コースの初期ロード、一式もろもろ
  loadCourseAssets ({ commit, state, rootState }) {
    console.log('rootState.app.userInfo', rootState.app.userInfo)
    const uid = rootState.app.userInfo.uid

    // Loading開始
    commit('app/UPDATE_ISLOADING', true, { root: true })

    Promise.all([
      // 商品一覧
      firestoreQuery.getAllProduct(uid),
      // タブ一覧
      firestoreQuery.getMenuTab(uid),
      // コース一覧
      firestoreQuery.getCourse(uid)
    ]).then((response) => {
      // 商品リスト
      commit(types.GET_ALL_PRODUCT_LIST, response[0])
      // タブ
      commit(types.GET_TAB_LIST, response[1])
      // コース一覧
      commit(types.UPDATE_LIST, response[2])
      // ロード終了
      commit(types.UPDATE_IS_LOADED, true)

      // Loading終了
      commit('app/UPDATE_ISLOADING', false, { root: true })
    })
  },
  // コース一覧取得
  async getCourse ({ commit, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    commit('app/UPDATE_ISLOADING', true, { root: true })
    let list = []
    try {
      list = await firestoreQuery.getCourse(uid)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.UPDATE_LIST, list)
    commit('app/UPDATE_ISLOADING', false, { root: true })
  },
  // 新規コース作成
  async createCourse ({ commit, dispatch, state, rootState }, course) {
    const uid = rootState.app.userInfo.uid
    commit('app/UPDATE_ISLOADING', true, { root: true })

    course.itemGroup.forEach((group, index) => {
      delete course.itemGroup[index].errors
    })

    try {
      await firestoreQuery.createCourse(uid, course)
    } catch (err) {
      console.log('catch err', err)
    }

    commit('app/UPDATE_ISLOADING', false, { root: true })
    commit(types.UPDATE_IS_SAVED, true)

    // コース一覧を更新
    dispatch('getCourse')
  },
  // コース更新
  async updateCourse ({ commit, dispatch, state, rootState }, order) {
    const uid = rootState.app.userInfo.uid
    const { id, postData } = order

    const data = cloneDeep(postData)

    data.itemGroup.forEach((group, gIndex) => {
      group.item.forEach((item, index) => {
        // console.log('data.itemGroup[gIndex]', data.itemGroup[gIndex].item[index])
        delete data.itemGroup[gIndex].errors
        // delete data.itemGroup[gIndex].item[index].name
        // delete data.itemGroup[gIndex].item[index].price
      })
    })

    commit('app/UPDATE_ISLOADING', true, { root: true })

    try {
      await firestoreQuery.updateCourse(uid, id, data)
    } catch (err) {
      console.log('catch err', err)
    }

    commit(types.UPDATE_IS_SAVED, true)
    commit('app/UPDATE_ISLOADING', false, { root: true })

    // コース一覧を更新
    dispatch('getCourse')
  },
  /*
  // 商品一覧を取得 - TODO: 廃止
  async getAllProduct ({ commit, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    let product = {}
    try {
      product = await firestoreQuery.getAllProduct(uid)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.GET_ALL_PRODUCT_LIST, product)
  },
  // メニュータブを取得 - TODO: 廃止
  async getMenuTabList ({ commit, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    let tabList
    try {
      tabList = await firestoreQuery.getMenuTab(uid)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.GET_TAB_LIST, tabList)
  },
  */
  async getCourseDetail ({ commit, state, rootState }, courseId) {
    const uid = rootState.app.userInfo.uid
    commit('app/UPDATE_ISLOADING', true, { root: true })
    let data = {}
    try {
      data = await firestoreQuery.getCourseDetail(uid, courseId)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.UPDATE_DATA, data)
    commit('app/UPDATE_ISLOADING', false, { root: true })
  }
}
