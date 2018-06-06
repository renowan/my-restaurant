import * as types from './mutationTypes'
import cu from '@/components/ui/utils/calendarUtils'
import { getTimeStrFromPoint } from '@/common/utils/timeUtility'
import { changeDateFormat } from '@/common/utils/utils'
import { cloneDeep } from 'lodash'

const firebase = window.firebase
const db = firebase.firestore()

const chartDataFormat = {
  labels: [],
  datasets: [
    {
      label: 'label-1',
      backgroundColor: 'transparent',
      data: [],
      type: 'line',
      fill: false,
      lineTension: 0
    },
    {
      label: 'label-2',
      backgroundColor: '#f87979',
      data: []
    },
  ]
}

export default {
  init ({ commit, state, dispatch, rootState }, yearMonth) {
    commit('UPDATE_YEAR_MONTH', yearMonth)
  },

  // メッセージ定型文一覧の取得
  getMontlyRsv ({ commit, state, dispatch, rootState }) {
    const yearMonth = state.yearMonth

    // loading処理
    commit('app/UPDATE_ISLOADING', true, { root: true })

    const uid = rootState.app.userInfo.uid
    const rsvRef = db.collection(`users/${uid}/db/${yearMonth}/rsv`)
    const rsvList = []
    rsvRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const obj = Object.assign({}, { id: doc.id }, doc.data())
        rsvList.push(obj)
      })
      commit('app/UPDATE_ISLOADING', false, { root: true })
      commit(types.GET_MONTLY_RSV, rsvList)
      dispatch('createChartData')
    })
  },

  createChartData ({ commit, state }) {
    const rsvList = state.rsvList

    // カレンダーデータ
    const dateRange = cu.getDateRange({
      targetDate: this.yearMonth
    })

    // 前後の日を覗いた1~31日部分
    const dateRangeBase = []
    dateRange.forEach((day) => {
      if (day.isCurrentMonth) {
        dateRangeBase.push(day)
      }
    })

    // chart1
    const chartData1 = cloneDeep(chartDataFormat)
    chartData1.datasets[0].label = '予約人数'
    chartData1.datasets[1].label = '予約数'

    const chartData1Core = []
    dateRangeBase.forEach((day) => {
      // 一日の予約総数
      day.value = 0
      // 一日の来店人数
      day.num = 0
      chartData1Core.push(day)
    })

    rsvList.forEach((rsv) => {
      const rangeIndex = Number(String(rsv.date).slice(6, 8)) - 1
      chartData1Core[rangeIndex].value++
      chartData1Core[rangeIndex].num += rsv.num
    })

    chartData1Core.forEach((day) => {
      chartData1.labels.push(String(day.text))
      chartData1.datasets[0].data.push(day.num)
      chartData1.datasets[1].data.push(day.value)
    })

    // -----------------------------

    // chart2 - 曜日別の人数、予約数
    const chartData2 = cloneDeep(chartDataFormat)
    chartData2.labels = ['日', '月', '火', '水', '木', '金', '土']
    chartData2.datasets[0].label = '予約人数'
    chartData2.datasets[1].label = '予約数'
    chartData2.datasets[0].data = [0, 0, 0, 0, 0, 0, 0]
    chartData2.datasets[1].data = [0, 0, 0, 0, 0, 0, 0]

    rsvList.forEach((rsv) => {
      const youbi = new Date(changeDateFormat(String(rsv.date))).getDay()
      chartData2.datasets[0].data[youbi] += rsv.num
      chartData2.datasets[1].data[youbi]++
    })

    // -----------------------------

    // chart3 - 時間別の人数、予約数
    const chartData3 = cloneDeep(chartDataFormat)

    Array.apply(null, { length: 30 }).forEach((elm, index) => {
      const h = Number(getTimeStrFromPoint(index * 4).slice(0, 2))
      chartData3.labels.push(h + '時')
      chartData3.datasets[0].label = '予約人数'
      chartData3.datasets[1].label = '予約数'
      chartData3.datasets[0].data[index] = 0
      chartData3.datasets[1].data[index] = 0
    })

    rsvList.forEach((rsv) => {
      const timeIndex = Math.floor(rsv.start / 4)
      chartData3.datasets[0].data[timeIndex] += rsv.num
      chartData3.datasets[1].data[timeIndex]++
    })

    // -----------------------------

    commit(types.CHART_DATA, {
      chartData1,
      chartData2,
      chartData3,
    })
  }
}
