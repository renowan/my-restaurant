<template>
  <div>
    <div>
      <label class="control-label">予約状態</label>
    </div>
    <label class="radio-inline mr10">
      <input type="radio" name="rsv-stat" v-model="myState" :value="0">未確定
    </label>
    <label class="radio-inline mr10">
      <input type="radio" name="rsv-stat" v-model="myState" :value="1">確定
    </label>
    <label class="radio-inline mr10">
      <input type="radio" name="rsv-stat" v-model="myState" :value="2">来店済
    </label>
    <label class="radio-inline mr10">
      <input type="radio" name="rsv-stat" v-model="myState" :value="3">キャンセル
    </label>
  </div>
</template>

<script>
export default {
  name: 'rsv-state',
  props: {
    value: { type: Number, default: () => 0 }
  },
  data () {
    return {
      myState: 0
    }
  },
  created () {
    this.update()
  },
  watch: {
    myState (val) {
      this.$emit('input', val)
    },
    value () {
      this.update()
    }
  },
  methods: {
    update () {
      this.myState = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
