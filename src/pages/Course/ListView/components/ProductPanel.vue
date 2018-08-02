<template>
  <div class="panel">
    <div class="panel-body">

      <div class="row">
        <div class="col-xs-3">
          <img src="/static/assets/img/stock/1.jpg" class="course-img">
        </div>
        <div class="col-xs-9 col-md-5">
          <div class="product-main-title">
            <router-link :to="{ name: 'course-detail', params: { id: item.id } }" class="product-name">{{item.name}}</router-link>
          </div>
          <div class="course-text">
            {{item.description}}
          </div>
        </div>
        <div class="col-xs-6 col-md-4 pull-right">
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
                <td>{{item.price}}</td>
                <td>{{inTax}}</td>
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
  props: {
    item: { typs: Object, required: true },
    taxRate: { type: Number, default: () => 1 }
  },
  components: {

  },
  computed: {
    inTax () {
      return Math.round(this.item.price * this.taxRate)
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

    }
  }
}
</script>

<style lang="scss" scoped>
.course-img {
  width: 100%;
  // max-height: 100px;
  margin-right: 16px;
}

.course-text {
  margin-bottom: 16px;
}
a.product-name {
  font-size: 15px;
  font-weight: bold;
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
</style>
