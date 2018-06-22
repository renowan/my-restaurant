<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">
    <div class="container-fluid pv16">
      <div class="row">
        <div class="col-xs-12 text-center">
          <monthSeletor v-model="yearMonth"></monthSeletor>
        </div>
      </div>
    </div>

    <div class="container-fluid mb16 bg-white">
      <div class="row pv16">
        <div class="col-xs-12">
          <h3 class="text-center">予約数と予約人数</h3>
          <barChart
            v-if="!noRsvData"
            :chartData="sumally.chartData1"
            :options="options">
          </barChart>
          <barChartEmty
            v-if="noRsvData"
            :chartData="sumally.chartData1"
            :options="optionsEmty">
          </barChartEmty>
        </div>
      </div>
      <div class="row pv16">
        <div class="col-xs-12">
          <h3 class="text-center">曜日別予約数と予約人数</h3>
          <barChart
            v-if="!noRsvData"
            :chartData="sumally.chartData2"
            :options="options">
          </barChart>
          <barChartEmty
            v-if="noRsvData"
            :chartData="sumally.chartData2"
            :options="optionsEmty">
          </barChartEmty>
        </div>
      </div>
      <div class="row pv16">
        <div class="col-xs-12">
          <h3 class="text-center">時間別予約数と予約人数</h3>
          <barChart
            v-if="!noRsvData"
            :chartData="sumally.chartData3"
            :options="options">
          </barChart>
          <barChartEmty
            v-if="noRsvData"
            :chartData="sumally.chartData3"
            :options="optionsEmty">
          </barChartEmty>
        </div>
      </div>
    </div>

  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
// import { cloneDeep } from 'lodash'
import contentWrapper from '@/components/Layout/ContentWrapper'
import barChart from './BarChart'
import barChartEmty from './BarChartEmty'
// import rsvList from './cal-montly-rsv.json'
import monthSeletor from './MonthSeletor'

const optionsHasValue = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
  },
  scales: null
}

const optionsEmty = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          max: 10
        }
      }
    ]
  }
}

export default {
  name: 'sumally-view',
  components: {
    contentWrapper,
    barChart,
    barChartEmty,
    monthSeletor
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      sumally: 'sumally/state',
      rsvList: 'sumally/rsvList',
    }),
    {
      yearMonth: {
        get () {
          return this.sumally.yearMonth
        },
        set (val) {
          this.$store.commit('sumally/UPDATE_YEAR_MONTH', val)
          this.$store.dispatch('sumally/getMontlyRsv', val)
        }
      },
      noRsvData () {
        return this.rsvList.length < 1 && this.sumally.chartData1 !== null
      }
    }
  ),
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: '統計', link: null }
      ],
      chartData1: null,
      chartData2: null,
      chartData3: null,
      options: optionsHasValue,
      optionsEmty: optionsEmty
    }
  },
  created () {
    const yyyymm = this.app.serverTime.yyyymm
    this.$store.dispatch('sumally/init', yyyymm)
    this.$store.dispatch('sumally/getMontlyRsv', yyyymm)
  }
}
</script>
