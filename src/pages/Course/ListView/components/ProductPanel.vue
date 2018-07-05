<template>
  <div class="panel">
    <div class="panel-body pb5">
      <div class="product">
        <div class="image-wrapper">
          <img src="/static/assets/img/stock/1.jpg">
        </div>
        <div class="product-main">
          <div class="product-main-title">
            <a href="javascript:void(0)" class="product-name" @click="editProduct">dddd</a>
            <span class="label label-warning">NEW</span>
          </div>
          <div class="txt">
            xxxxxx
          </div>
        </div>
        <div class="price-wrapper">
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
                <td>cdd</td>
                <td>cdd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-panel',
  components: {

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
    editProduct () {

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
    border-left: 1px solid #e5e5e5;
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
