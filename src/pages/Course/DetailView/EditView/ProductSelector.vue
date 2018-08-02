<template>
  <div>
    <table class="table">
      <tbody>
        <productRow
        v-for="(item, index) in selectList"
        :index="index"
        :key="index"
        :item="item"
        @update-checkbox="updateCheckbox">
        </productRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import productRow from './ProductRow'

export default {
  name: 'product-selector',
  props: {
    showItemModal: { type: Boolean, default: () => false },
    selectList: { type: Array, required: true }
  },
  components: {
    productRow
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
    updateCheckbox (order) {
      this.$emit('update-checkbox', order)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
