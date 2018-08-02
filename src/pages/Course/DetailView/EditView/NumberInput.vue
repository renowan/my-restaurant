<template>
  <div class="form-group" :class="{'has-error': hasError}">
    <label>{{label}}</label>
    <input type="text" :id="id" class="form-control" placeholder="" v-model.number="localValue">
  </div>
</template>

<script>
export default {
  name: 'number-input',
  props: {
    label: { type: String, default: () => '' },
    id: { type: String, default: () => '' },
    // 強制エラー表示
    isError: { type: Boolean, default: () => false },
    value: { required: true }
  },
  components: {

  },
  computed: {
    hasError () {
      return !Number.isInteger(this.localValue) || this.localValue < 1 || this.isError
    }
  },
  watch: {
    value (val) {
      this.localValue = val
    },
    localValue (val) {
      const myValue = val === '' ? null : val
      this.$emit('input', myValue)
    }
  },
  data () {
    return {
      localValue: 1
    }
  },
  created () {
    this.localValue = this.value
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
