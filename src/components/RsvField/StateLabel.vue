<template>
  <span class="label" :class="myColor">{{stateTxt}}</span>
</template>

<script>
const obj = {
  0: '未確定',
  1: '確定',
  2: '来店済',
  3: 'キャンセル',
}

export default {
  name: 'state-label',
  props: {
    state: { type: Number, default: () => 0 }
  },
  data () {
    return {
    }
  },
  computed: {
    stateTxt () {
      return obj[this.state]
    },
    myColor () {
      if (this.state === 0) return 'label-warning'
      if (this.state === 2) return 'label-default'
      return 'label-success'
    }
  }
}
</script>

<style lang="scss" scoped>
.rsv-state-label {
  font-size: 11px;
}
.label {
  width: 72px;
  display: inline-block;
  line-height: 1.4;
  padding: .3em .3em .1em;
  // background-color: #fff;
}

// .label-warning {
//   color: #f6bb42;
//   border: 1px solid #f6bb42;
// }
//
// .label-default {
//   color: #777;
//   border: 1px solid #777;
// }
// .label-success {
//   color: #70ca63;
//   border: 1px solid #70ca63;
// }
// .label-danger {
//   color: #e9573f;
//   border: 1px solid #e9573f;
// }
</style>
