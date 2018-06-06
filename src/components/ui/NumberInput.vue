<template>
  <input class="form-control" v-model="index" :placeholder="placeholder">
</template>

<script>
export default {
  name: 'number-input',
  props: {
    value: { type: Number, default: () => null },
    placeholder: { type: String, default: () => '' }
  },
  watch: {
    index (val) {
      if (val === '' || val === undefined) {
        this.index = undefined
      } else {
        this.index = Number(String(val).replace(/[^0-9]+/g, ''))
      }
      this.$emit('input', this.index)
    },
    value (val) {
      if (val !== this.index) {
        this.index = val
      }
    }
  },
  data () {
    return {
      index: null
    }
  },
  created () {
    this.index = this.value
  }
}
</script>
