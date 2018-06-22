<template>
  <h2>
    <a href="javascript:void(0)" class="btn-go-prev" @click="goPrev"><i class="fa fa-angle-left"></i></a>
     {{titleTxt}}
     <a href="javascript:void(0)" class="btn-go-next" @click="goNext"><i class="fa fa-angle-right"></i></a>
  </h2>
</template>

<script>
import moment from 'moment'

export default {
  name: 'month-seletor',
  props: {
    value: { type: String, required: true }
  },
  components: {

  },
  computed: {
    titleTxt () {
      // const arr = this.localValue.split('/')
      const y = this.localValue.slice(0, 4)
      const m = Number(this.localValue.slice(4, 6))
      return `${y}月年${m}月`
    }
  },
  watch: {
    localValue (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  created () {
    this.localValue = this.value
  },
  methods: {
    goPrev () {
      const y = this.localValue.slice(0, 4)
      const m = this.localValue.slice(4, 6)
      const val = `${y}-${m}-01`
      this.localValue = moment(val).subtract(1, 'months').format('YYYYMM')
    },
    goNext () {
      const y = this.localValue.slice(0, 4)
      const m = this.localValue.slice(4, 6)
      const val = `${y}-${m}-01`
      this.localValue = moment(val).add(1, 'months').format('YYYYMM')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-go-prev, .btn-go-next {
  display: inline-block;
  width: 80px;
  height: 20px;
}
</style>
