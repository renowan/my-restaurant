<template>
  <div class="container-fluid pn mh8">

    <div class="course-title">
      <div class="container-fluid ph16">
        <div class="row">
          <div class="col-xs-12">
            <h3>{{data.name}}</h3>
            <p>{{data.description}}</p>
          </div>
        </div>
      </div>
    </div>

    <courseImage></courseImage>

    <div class="container-fluid">
      <itemGroupTable
      v-for="(group, index) in data.itemGroup"
      :key="index" :group="group"
      :productObj="course.productObj">
      </itemGroupTable>
    </div>

    <div class="container-fluid mt16 mb40">
      <div class="row">
        <div class="col-md-6 text-center bdr">
          <h3 class="mbn">定価合計</h3>
          定価 <price :price="totalPrice" :isIncludeTax="false" :discountRate="0" :taxRate="app.taxRate"></price>,
          <price :price="totalPrice" :isIncludeTax="true" :isDiscount="false" :discountRate="0" :taxRate="app.taxRate"></price>
        </div>
        <div class="col-md-6 text-center">
          <h3 class="mbn">設定価格<small> 定価の{{rate}}%</small></h3>
          定価 <price :price="data.price" :isIncludeTax="false" :discountRate="0" :taxRate="app.taxRate"></price>,
          <price :price="data.price" :isIncludeTax="true" :isDiscount="false" :discountRate="0" :taxRate="app.taxRate"></price>
        </div>
      </div>
    </div>

    <div class="container-fluid mb40">
      <div class="row">
        <div class="col-xs-12 text-center">
          <router-link :to="{ name: 'course' }" class="btn btn-default btn-lg btn-under">コース一覧</router-link>
          <router-link :to="{ name: 'course-edit', params: { id: $route.params.id } }" class="btn btn-default btn-primary btn-lg btn-under">編集</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import itemGroupTable from '@/components/ui/ItemGroupTable/'
import price from '@/components/ui/Price'
import courseImage from './CourseImage'

export default {
  name: 'course-detail-view',
  components: {
    itemGroupTable,
    price,
    courseImage
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
      data: 'course/data',
      editData: 'course/editData',
    }),
    {
      totalPrice () {
        let total = 0
        const productObj = this.course.productObj
        this.data.itemGroup.forEach((group) => {
          group.item.forEach((item) => {
            total += (productObj[item.productId].price || 0) * item.value
          })
        })
        return total
      },
      rate () {
        const rate = this.data.price / this.totalPrice * 100
        const n = 1
        return Math.floor(rate * Math.pow(10, n)) / Math.pow(10, n)
      }
    }
  ),
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
.course-title {
  background-color: #f2f2f2;
  margin: 0 -8px;
  padding-top: 0;
  padding-bottom: 16px;
}

.bdr {
  border-right: 1px solid #d9d9d9;
}

.btn-under {
  width: 140px;
}
</style>
