<template>
  <input class="form-control" :placeholder="placeholder" v-model="index">
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
      this.index = String(val).replace(/[^0-9]+/g, '')
      this.$emit('input', this.index)
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
