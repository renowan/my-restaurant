<template>
  <td :class="day.sclass" @click="goDay">
    <div class="date-txt">
      {{day.text}}
    </div>
    <span class="label label-rounded label-success" v-if="day.rsvVaule > 0">{{day.rsvVaule}}</span>
  </td>
</template>

<script>
export default {
  name: 'day-cell',
  props: {
    day: { type: Object, required: true }
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    goDay () {
      const dateText = this.day.dateText
      this.$router.push({ name: 'rsv', params: { date: dateText } })
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  border: 1px solid #ddd;
  text-align: center;
  padding-bottom: 8px;
  height: 80px;
  vertical-align: top;
  cursor: pointer;

  .date-txt {
    text-align: right;
    padding: 4px 8px 0 0;
    color: #bbb;
    // color: #777;
    margin-bottom: 8px;
    font-size: 14px;
  }
}

.day-0 .date-txt {
  color: #e9573f;
}
.day-6 .date-txt {
  color: #3bafda;
}

.datepicker-item-gray {
  background-color: #f9f9f9;
  .date-txt {
    color: #dcdcdc;
  }
}

td.datepicker-dateRange-item-active {
  background-color: #ffffea!important;
}
</style>
