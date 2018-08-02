<template>
  <div class="product">
    <div class="image-wrapper">
      <img src="/static/assets/img/stock/1.jpg">
    </div>
    <div class="product-main">
      <div class="product-main-title">
        <a href="javascript:void(0)" class="product-name" @click="editProduct">{{product.name}}</a>

        <span class="label label-warning" v-if="product.isNew">NEW</span>
        <span class="label label-info" v-if="isDiscount">割引</span>
        <span class="label label-info" v-if="product.isLunchOnly">ランチ限定</span>
        <span class="label label-info" v-if="product.allYouCanEat">食べ放題</span>
      </div>

      <div class="txt">
        {{product.description}}
      </div>
    </div>
    <div class="price-wrapper">
      <div class="">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th class="waribiki"></th>
              <th class="tax-out">税抜</th>
              <th class="tax-in">税込み</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>定価</td>
              <td>
                <price
                :price="product.price"
                :isIncludeTax="false"
                :discountRate="0"
                :taxRate="taxRate"
                :showTaxType="false"
                size="sm">
                </price>
            </td>
              <td>
                <price
                :price="product.price"
                :isIncludeTax="true"
                :discountRate="0"
                :taxRate="taxRate"
                :showTaxType="false"
                size="sm">
                </price>
              </td>
            </tr>
            <tr v-if="isDiscount">
              <td>割引({{product.discount}}%)</td>
              <td>
                <price
                :price="product.price"
                :isIncludeTax="false"
                :discountRate="product.discount"
                :taxRate="taxRate"
                :showTaxType="false"
                size="sm">
                </price>
              </td>
              <td>
                <price
                :price="product.price"
                :isIncludeTax="true"
                :discountRate="product.discount"
                :taxRate="taxRate"
                :showTaxType="false"
                size="sm">
                </price>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import price from '@/components/ui/Price'

export default {
  name: 'product',
  props: {
    product: { type: Object, default: () => {} },
    taxRate: { type: Number, default: () => 1 }
  },
  components: {
    price
  },
  computed: {
    isDiscount () {
      return this.product.discount > 0
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
    editProduct () {
      this.$emit('edit-product', this.product)
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  display: table;
  width: 100%;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 79px;

  &:last-child {
    padding-bottom: 0;
    border-width: 0;
  }

  .image-wrapper {
    display: table-cell;
    width: 112px;
    vertical-align: top;

    img {
      width: 100px;
      height: 72px;
    }
  }
  .product-main {
    display: table-cell;
    vertical-align: top;
    padding-right: 16px;
    a.product-name {
      font-size: 15px;
      font-weight: bold;
    }
    .txt {
      margin-top: 4px;
    }
    .label {
      position: relative;
      top: -3px;
      padding: .3em .7em .2em;
    }
  }
  .price-wrapper {
    display: table-cell;
    width: 240px;
    padding-left: 16px;
    padding-top: 8px;
    // text-align: center;
    vertical-align: middle;
    // border-left: 1px solid #e5e5e5;
    font-size: 13px;

    .lth {
      text-decoration: line-through;
    }
    .fa-angle-right {
      margin: 0 8px;
    }
    .waribiki {
      width: 70px;
    }
    .tax-in {
      width: 74px;
    }
    .tax-out {
      width: 74px;
    }
  }
}
</style>
