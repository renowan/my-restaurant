<template>
  <tr>
    <td>1</td>
    <td>{{productName}}</td>
    <td>{{productPrice}}</td>
    <td>
      <div class="input-group" :class="{'has-error': !validation}">
        <input type="text" class="form-control input-sm" placeholder="" v-model.number="item.value">
      </div>
    </td>
    <td>
      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm" @click="chnageIndex(-1)">
          <i class="fa fa-angle-up"></i>
        </button>
        <button type="button" class="btn btn-default btn-sm" @click="chnageIndex(1)">
          <i class="fa fa-angle-down"></i>
        </button>
      </div>
    </td>
    <td class="text-center">
      <a href="javascript:void(0)" class="btn-delete" @click="deleteItem">
        <i class="fa fa-times"></i>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'select-item-tr',
  props: {
    index: { type: Number, default: () => 0 },
    item: { type: Object, required: true },
    productList: { type: Array, required: true },
    productObj: { type: Object, required: true }
  },
  components: {

  },
  computed: {
    productName () {
      const productId = this.item.productId
      return this.productObj[productId].name || '不明'
    },
    productPrice () {
      const productId = this.item.productId
      const price = this.productObj[productId].price
      return price ? '¥' + price : '-'
    }
  },
  watch: {
    'item.value' (val) {
      this.validation = Number.isInteger(val) && val > 0
    }
  },
  data () {
    return {
      validation: true
    }
  },
  created () {

  },
  methods: {
    deleteItem () {
      this.$emit('delete-item', this.item)
    },
    chnageIndex (value) {
      this.$emit('change-index', { index: this.index, value })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-delete {
  width: 24px;
  height: 24px;
  display: inline-block;
  text-align: center;
  padding-top: 2px;
}
</style>
