<template>
  <td :class="day.sclass">
    <div class="date-txt">
      {{day.text}}
    </div>
    <span class="label label-rounded label-primary">41</span>
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

  }
}
</script>

<style lang="scss" scoped>
td {
  border: 1px solid #ddd;
  text-align: center;
  padding-bottom: 8px;

  .date-txt {
    text-align: right;
    padding: 4px 8px 0 0;
    color: #bbb;
    // color: #777;
    margin-bottom: 8px;
    font-size: 14px;
  }
}



.day-1 .date-txt {
  color: #e9573f;
}
.day-0 .date-txt {
  color: #4a89dc;
}

.datepicker-item-gray {
  background-color: #f9f9f9;
  .date-txt {
    color: #dcdcdc;
  }
}
</style>
