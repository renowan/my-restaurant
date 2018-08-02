<template>
  <div class="panel">
    <div class="panel-heading">
      <span class="panel-icon">
        <i class="fa fa-files-o"></i>
      </span>
      <span class="panel-title">{{group.name || '未設定'}}</span>
    </div>
    <div class="panel-body">
      <div class="list-group list-group-links list-group-spacing-sm mbn">
        <ul class="pl15 mbn">
          <li v-if="group.item.length < 1">商品未登録</li>
          <li v-for="(item, index) in group.item" :key="index">
            {{itemName(item.productId)}} × {{item.value || '0'}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-group',
  props: {
    group: { type: Object, required: true },
    productObj: { type: Object, required: true }
  },
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
    itemName (productId) {
      return this.productObj[productId].name || '不明'
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group {
  li {
    position: relative;
    .label {
      float: right;
    }
  }
}
</style>
