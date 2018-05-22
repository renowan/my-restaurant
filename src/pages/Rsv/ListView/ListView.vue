<template>
  <div class="row">
    <div class="col-xs-12">
      <rsvTable
      :list="rsvList"
      :tableList="tableList"
      :uiLoadingList="[]"
      @rsv-action="rsvAction">
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
    rsvAction () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
