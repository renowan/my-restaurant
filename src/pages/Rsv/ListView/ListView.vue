<template>
  <div class="row">
    <div class="col-xs-12">
      <rsvTable
      :list="rsvList"
      :tableList="tableList"
      :uiLoadingList="[]"
      @rsv-action="rsvAction"
      @on-select="onSelect">
      </rsvTable>
    </div>
  </div>
</template>

<script>
import rsvTable from './RsvTable'

export default {
  name: 'list-view',
  props: {
    rsvList: { type: Array, default: () => [] },
    tableList: { type: Array, default: () => [] }
  },
  components: {
    rsvTable
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
    rsvAction (e) {
      console.log('action listview', e)
      this.$emit('rsv-action', e)
    },
    onSelect (id) {
      console.log('list id', id)
      this.$emit('on-select', id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
