import * as firestoreQuery from '@/store/firestoreQuery.js'
import * as types from './mutationTypes'
import { getDefaultData } from '@/common/constant/defaultData'

export default {
  // コース一覧取得
  async getCourse ({ commit, state, rootState }) {
    const uid = rootState.app.userInfo.uid
    let list = []
    try {
      list = await firestoreQuery.getCourse(uid)
    } catch (err) {
      console.log('catch err', err)
    }
    commit(types.UPDATE_LIST, list)
  },
  createCourse ({ commit, state }) {
    commit(types.UPDATE_EDIT_DATA, getDefaultData('course'))
  }
}
