<template>
  <div class="page-tabs">
    <ul class="nav nav-tabs">
      <li :class="activeClass(0)" @click="localValue = 0">
        <a href="javascript:void(0)">メイン</a>
      </li>
      <li :class="activeClass(1)" @click="localValue = 1">
        <a href="javascript:void(0)">飲み物</a>
      </li>
    </ul>
    <button type="button" class="btn btn-default btn-sm btn-plus">
      <i class="fa fa-plus"></i> タブ追加
    </button>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    value: { type: Number, required: true }
  },
  components: {

  },
  computed: {

  },
  watch: {
    value (val) {
      if (val !== this.localValue) {
        this.localValue = this.value
      }
    },
    localValue (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      localValue: 0
    }
  },
  created () {
    this.localValue = this.value
  },
  methods: {
    activeClass (index) {
      return index === this.localValue ? 'active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page-tabs {
  position: relative;
  margin-right: auto;
  margin-left: auto;
  padding-left: 11px;
  padding-right: 11px;
  padding-top: 34px;
}

.btn-plus {
  position: absolute;
  top: 34px;
  right: 30px;
}
</style>
