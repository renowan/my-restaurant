<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          <span class="panel-title">
            <span class="fa fa-files-o"></span>グループ名: {{group.name}}
          </span>
          <div class="pull-right hidden-xs"></div>
        </div>
        <div class="panel-body pn">
          <table class="table">
            <thead>
              <tr>
                <th width="30">#</th>
                <th>商品名</th>
                <th width="80">定価</th>
                <th width="80">数量</th>
              </tr>
            </thead>
            <tbody>

            <tableTr
            v-for="(item, index) in group.item"
            :key="index"
            :item="item"
            :index="index"
            :productObj="productObj">
            </tableTr>

            </tbody>
          </table>
          <div class="dt-panelfooter pv8 pr16 clearfix">
            <div class="pull-left"></div>
            <div class="pull-right">
              合計<span class="ml8 fs18 text-primary">{{total}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableTr from './TableTr'

export default {
  name: 'item-group-table',
  props: {
    group: { type: Object, required: true },
    productObj: { type: Object, required: true }
  },
  components: {
    tableTr
  },
  computed: {
    total () {
      const productObj = this.productObj
      let total = 0
      this.group.item.forEach((item) => {
        const price = productObj[item.productId].price || 0
        total += price * item.value
      })
      return '¥' + total
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
