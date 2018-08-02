<template>
  <tr>
    <td width="32">
      <input type="checkbox" v-model="isCheck" @input="onSelect">
    </td>
    <td>{{item.name}}</td>
    <td width="120">¥{{item.price}}</td>
  </tr>
</template>

<script>
import { input } from 'vue-strap'

export default {
  name: 'product-row',
  props: {
    item: { type: Object, required: true },
    // index: { type: Number, default: () => 0 }
  },
  components: {
    bsInput: input
  },
  computed: {

  },
  watch: {
    item (val) {
      this.isCheck = val.select
    }
  },
  data () {
    return {
      isCheck: false
    }
  },
  created () {
    this.isCheck = this.item.select
  },
  methods: {
    onSelect (e) {
      this.$emit('update-checkbox', {
        id: this.item.id,
        name: this.item.name,
        price: this.item.price,
        value: e.target.checked
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
