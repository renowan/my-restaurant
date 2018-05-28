<template>
  <div class="panel">
    <div class="panel-body pn">

      <table class="table">
        <thead>
          <tr>
            <th class="pl24 w120">状態</th>
            <th class="w100">予約時間</th>
            <th class="w120">利用時間</th>
            <th class="w160">予約名</th>
            <th class="w60">人数</th>
            <th class="">テーブル</th>
            <th class="pr24"></th>
          </tr>
        </thead>
        <tbody>
          <rsv-tr v-for="(item, index) in list"
          v-bind:key="'rsv-tr-' + index"
          :rsv="item"
          :tableList="tableList"
          @rsv-action="rsvAction"
          @on-select="onSelect">
          </rsv-tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import rsvTr from './RsvTr'

export default {
  name: 'rsv-table',
  props: {
    list: { type: Array, required: true },
    tableList: { type: Array, default: () => [] },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    rsvTr
  },
  methods: {
    rsvAction (e) {
      this.$emit('rsv-action', e)
    },
    onSelect (id) {
      this.$emit('on-select', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.w60 {
  width: 60px;
}
.w80 {
  width: 80px;
}
.w90 {
  width: 90px;
}
.w110 {
  width: 110px;
}
.w120 {
  width: 120px;
}
.w160 {
  width: 160px;
}
.w180 {
  width: 180px;
}
</style>
