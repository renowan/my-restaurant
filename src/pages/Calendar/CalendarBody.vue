<template>
  <tbody>
    <tr v-for="(row, index) in dateRange" :key="index">
      <dayCell v-for="(day, dayIndex) in row" :key="dayIndex" :day="day"></dayCell>
    </tr>
  </tbody>
</template>

<script>
import { chunk } from 'lodash'
import cu from '@/components/ui/utils/calendarUtils'
import dayCell from './DayCell'

export default {
  name: 'calendar-body',
  props: {
    yearmonth: { type: String, required: true }
  },
  components: {
    dayCell
  },
  computed: {

  },
  watch: {
    yearmonth (val) {
      console.log('init yearmonth', val)
      this.init()
    }
  },
  data () {
    return {
      dateRange: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const dateRange = cu.getDateRange({
        targetDate: this.yearmonth + '01'
      })
      console.log('dateRange', dateRange)
      this.dateRange = chunk(dateRange, 7)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
