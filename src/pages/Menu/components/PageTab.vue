<template>
  <div class="page-tabs">
    <ul class="nav nav-tabs">

      <li v-for="(item, index) in tabList"
      :key="index"
      :class="activeClass(index)"
      @click="localValue = index">
        <a href="javascript:void(0)">{{item.name}}</a>
      </li>

    </ul>
    <button type="button" class="btn btn-default btn-sm btn-plus" @click="newTab" v-if="tabList.length">
      <i class="fa fa-plus"></i> カテゴリ追加
    </button>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    value: { type: Number, required: true },
    tabList: { type: Array, default: () => [] }
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
    },
    newTab () {
      this.$emit('new-tab')
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
