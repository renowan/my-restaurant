<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn bg-white">
    <div class="container-fluid mb16">
      <div class="row pv16">
        <div class="col-xs-12">
          <barSample :chartData="chartData1" :options="options1" v-if="chartData1.labels.length > 0">
          </barSample>
        </div>
        <div class="col-xs-12">
          <button type="button" class="btn btn-default" @click="test1">
            test1
          </button>
        </div>
      </div>
    </div>
  </content-wrapper>
</template>

<script>
import cu from '@/components/ui/utils/calendarUtils'
import contentWrapper from '@/components/Layout/ContentWrapper'
import barSample from './BarSample'

export default {
  name: 'chart-view',
  components: {
    contentWrapper,
    barSample
  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'Chart', link: null }
      ],
      yearMonth: '2018/01/01',
      chartData1: {
        labels: [],
        datasets: [
          {
            backgroundColor: '#f87979',
            data: []
          }
        ]
      },
      options1: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        }
      }
    }
  },
  created () {

  },
  methods: {
    test1 () {
      const dateRange = cu.getDateRange({
        targetDate: this.yearMonth
      })
      // console.log('dateRange', dateRange)
      const chartData1 = {
        labels: [],
        datasets: [
          {
            backgroundColor: '#f87979',
            data: []
          }
        ]
      }

      dateRange.forEach((day) => {
        if (day.isCurrentMonth) {
          chartData1.labels.push(String(day.text))
          chartData1.datasets[0].data.push(Math.floor(Math.random() * 20) + 1)
        }
      })
      this.chartData1 = chartData1

      // this.chartData1 = {
      //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      //   datasets: [
      //     {
      //       backgroundColor: '#f87979',
      //       data: [10, 40, 12, 10, 60, 10, 70, 80, 30, 50, 20, 5]
      //     }
      //   ]
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
