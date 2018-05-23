// import * as types from './mutationTypes'
import cu from '@/components/ui/utils/calendarUtils'
import { chunk } from 'lodash'
import { changeDateFormat } from '@/common/utils/utils'

const firebase = window.firebase
const db = firebase.firestore()

export default {
  // メッセージ定型文一覧の取得
  getMontly ({ commit, state, rootState }, yearMonth) {
    // loading処理
    commit('app/UPDATE_ISLOADING', true, { root: true })

    const uid = rootState.app.userInfo.uid
    const rsvRef = db.collection(`users/${uid}/db/${yearMonth}/rsv`)

    const list = []
    const dateObj = {}
    rsvRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const obj = Object.assign({}, { id: doc.id }, doc.data())
        list.push(obj)

        const date = obj.date

        if (dateObj[date]) {
          dateObj[date] = dateObj[date] + 1
        } else {
          dateObj[date] = 1
        }
      })
      const targetDate = changeDateFormat(yearMonth + '01')
      console.log('targetDate', targetDate)
      const dateRangeBase = cu.getDateRange({
        targetDate,
        activeDay: rootState.app.serverTime.yyyymmdd
      })

      const dateRangeHasValue = dateRangeBase.map((day, index) => {
        if (day.isCurrentMonth) {
          // 当月の日
          const dateText = day.dateText
          const rsvVaule = dateObj[dateText] ? dateObj[dateText] : 0
          day.rsvVaule = rsvVaule
        } else {
          day.rsvVaule = 0
        }
        return day
      })

      const dateRange = chunk(dateRangeHasValue, 7)

      // commit('UPDATE_MONTH_RSV', list)
      commit('UPDATE_DATE_RANGE', dateRange)
      commit('app/UPDATE_ISLOADING', false, { root: true })
    })
  },
}
