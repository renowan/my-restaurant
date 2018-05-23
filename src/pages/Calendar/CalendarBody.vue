<template>
  <tbody>
    <tr v-for="(row, index) in dateRange" :key="index">
      <dayCell v-for="(day, dayIndex) in row" :key="dayIndex" :day="day"></dayCell>
    </tr>
  </tbody>
</template>

<script>
import dayCell from './DayCell'

export default {
  name: 'calendar-body',
  props: {
    dateRange: { type: Array, required: true }
  },
  components: {
    dayCell
  },
  computed: {

  },
  data () {
    return {
      // dateRange: []
    }
  },
  created () {
    // this.init()
  },
  methods: {
    // init () {
    //   const dateRange = cu.getDateRange({
    //     targetDate: this.yearMonth + '01'
    //   })
    //   // console.log('dateRange', dateRange)
    //   this.dateRange = chunk(dateRange, 7)
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
