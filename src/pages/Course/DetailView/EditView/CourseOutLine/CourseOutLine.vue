<template>
  <div class="out-line">
    <div class="out-line-block">
      <h5 class="media-heading">コース名</h5>
      <p>{{editData.name || '未設定'}}</p>
    </div>
    <div class="out-line-block">
      <h5 class="media-heading">コース説明文</h5>
      <p>{{editData.description || '未設定'}}</p>
    </div>

    <div class="out-line-block">
      <h5 class="media-heading">人数設定</h5>
      <p>最小人数: {{editData.minNum || ' -- '}}, 最小人数: {{editData.maxNum || ' -- '}}</p>
    </div>

    <menuGroup v-for="(group, index) in editData.itemGroup" :group="group" :key="index" :productObj="productObj"></menuGroup>

    <div class="out-line-block">
      <h5 class="media-heading">定価合計</h5>
      <p>¥{{totalPrice}}</p>
    </div>
    <div class="out-line-block">
      <h5 class="media-heading">設定価格</h5>
      <p>¥{{editData.price || 0}} - 定価合計の{{rate}}%</p>
    </div>

  </div>
</template>

<script>
import menuGroup from './MenuGroup'

export default {
  name: 'course-out-line',
  props: {
    editData: { type: Object, required: true },
    productObj: { type: Object, required: true }
  },
  components: {
    menuGroup
  },
  computed: {
    totalPrice () {
      let total = 0
      const productObj = this.productObj
      this.editData.itemGroup.forEach((group) => {
        group.item.forEach((item) => {
          total += (productObj[item.productId].price || 0) * item.value
        })
      })
      return total
    },
    rate () {
      const rate = this.editData.price / this.totalPrice * 100
      const n = 1
      return Math.floor(rate * Math.pow(10, n)) / Math.pow(10, n)
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
.out-line {
  width: 241px;
}
.out-line-block {
  color: #999;
  margin-bottom: 24px;
  p {
    font-size: 12px;
  }
}
</style>
