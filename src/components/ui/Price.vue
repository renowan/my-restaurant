<template>
  <span class="base" :class="size">
    ¥ <span class="price-lg" :class="priceClass">{{myPrice}}</span><span v-if="showTaxType">（{{taxType}}）</span>
  </span>
</template>

<script>
export default {
  name: 'price',
  props: {
    price: { type: Number, required: true },
    isIncludeTax: { type: Boolean, default: () => true },
    discountRate: { type: Number, default: () => 0 },
    taxRate: { type: Number, default: () => 1 },
    size: { type: String, default: () => 'default' },
    showTaxType: { type: Boolean, default: () => true }
  },
  components: {

  },
  computed: {
    myPrice () {
      const price = this.price
      const isIncludeTax = this.isIncludeTax
      const discountRate = this.discountRate
      const taxRate = this.taxRate
      let result = price

      // 割引
      if (discountRate > 0) {
        result = Math.round(price * ((100 - discountRate) / 100))
      }
      // 税込み
      if (isIncludeTax) {
        result = Math.round(result * taxRate)
      }
      return result
    },
    taxType () {
      return this.isIncludeTax ? '税込' : '税別'
    },
    isDiscount () {
      return this.discountRate > 0
    },
    priceClass () {
      const arr = []
      if (this.size !== 'default') {
        arr.push(this.size)
      }
      if (this.isIncludeTax && this.isDiscount) {
        arr.push('text-info')
      }
      if (this.isIncludeTax && !this.isDiscount) {
        arr.push('text-info')
      }
      return arr
    }
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
.base {
  font-size: 13px;
  &.sm {
    font-size: 11px;
  }
}
.price-lg {
  font-size: 20px;
  font-weight: bold;

  &.sm {
    font-size: 16px;
  }
}
</style>
