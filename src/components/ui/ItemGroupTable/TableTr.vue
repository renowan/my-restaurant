<template>
  <tr>
    <td width="30">{{index + 1}}</td>
    <td>{{myName}}</td>
    <td width="80">{{myPrice}}</td>
    <td width="80">{{item.value}}</td>
  </tr>
</template>

<script>
export default {
  name: 'table-tr',
  props: {
    item: { type: Object, required: true },
    index: { type: Number, default: () => 0 },
    productObj: { type: Object, required: true }
  },
  components: {

  },
  computed: {
    myName () {
      return this.productObj[this.item.productId].name || '不明'
    },
    myPrice () {
      return '¥' + this.productObj[this.item.productId].price || '-'
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

</style>
