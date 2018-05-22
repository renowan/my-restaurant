<template>
  <div v-if="!rsv" class="empty">
    予約詳細
  </div>
  <div v-else>
    <h4 class="mt24 mb16">予約詳細<stateLabel :state="rsv.state"></stateLabel><span class="saving" v-if="isLoading">Saving...</span></h4>

    <div class="d-label">予約者名</div>
    <div class="d-txt">{{rsv.name}} <span v-if="rsv.nameKana !== ''">（{{rsv.nameKana}}）</span></div>
    <div class="d-label">予約時間</div>
    <div class="d-txt">{{startTime}}</div>
    <div class="d-label">利用時間</div>
    <div class="d-txt">{{useTime}}</div>
    <div class="d-label">テーブル</div>
    <div class="d-txt">{{tableName}}</div>
    <!-- <div class="d-label">コース</div> -->
    <!-- <div class="d-txt">なんとか名前のコース</div> -->

    <div class="mb24">
      <button type="button" class="btn btn-default btn-block" @click="goEdit">
        編集
      </button>
      <button type="button" class="btn btn-default btn-block" @click="deleteRsv">
        削除
      </button>
    </div>
  </div>
</template>

<script>
// import { cloneDeep } from 'lodash'
import * as timeUtility from '@/common/utils/timeUtility'
import stateLabel from './StateLabel'

export default {
  name: 'detail-view',
  props: {
    onSelectId: { type: String, default: () => '' },
    rsvList: { type: Array, default: () => [] },
    tableList: { type: Array, default: () => [] },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    stateLabel
  },
  computed: {
    tableName () {
      if (!this.rsv) return ''
      const tableId = this.rsv.tableId
      if (tableId === '') return '未設定'
      const targetTable = this.tableList.filter((table) => table.id === tableId)[0]
      return targetTable.name
    },
    startTime () {
      return timeUtility.getTimeStrFromPoint(this.rsv.start)
    },
    useTime () {
      const time = this.rsv.long
      let min = time % 4 * 15
      if (min === 0) min = '00'
      const hour = Math.floor(time / 4)
      return `${hour}時間${min}分`
    },
    isLoading () {
      const onSelectId = this.onSelectId
      if (!onSelectId) return false
      return this.uiLoadingList.indexOf(onSelectId) > -1
    },
  },
  watch: {
    onSelectId () {
      this.updateTargetRsv()
    },
    rsvList () {
      this.updateTargetRsv()
    }
  },
  data () {
    return {
      rsv: null
    }
  },
  created () {

  },
  methods: {
    updateTargetRsv () {
      if (!this.onSelectId) return
      const onSelectId = this.onSelectId
      this.rsv = this.rsvList.filter((rsv) => rsv.id === onSelectId)[0]
    },
    goEdit () {
      // this.$emit('show-edit-modal', this.rsv.id)
      this.$emit('rsv-action', {
        action: 'edit',
        id: this.rsv.id
      })
    },
    deleteRsv () {
      this.$emit('rsv-action', {
        action: 'delete',
        id: this.rsv.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.d-label {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
  margin-bottom: 4px;
  // font-size: 11px;
}

.d-txt {
  margin-bottom: 24px;
  // font-size: 11px;
}

.empty {
  text-align: center;
  padding-top: 140px;
  font-size: 30px;
  font-weight: bold;
  color: #ddd;
}
.label {
  margin-left: 8px;
}
.saving {
  font-weight: normal;
  font-size: 12px;
  margin-left: 8px;
}
</style>
