<template>
  <div class="panel">
    <div class="panel-body pb5">
      <product :product="product" @edit-product="editProduct" :taxRate="taxRate"></product>
    </div>
  </div>
</template>

<script>
import product from './Product'

export default {
  name: 'product-panel',
  props: {
    product: { type: Object, default: () => {} },
    taxRate: { type: Number, default: () => 1 }
  },
  components: {
    product
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
    editProduct (product) {
      console.log('panel', product)
      this.$emit('edit-product', product)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
