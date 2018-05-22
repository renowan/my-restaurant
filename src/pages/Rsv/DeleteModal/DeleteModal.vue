<template>
  <div>
    <modal v-model="showMyModal" title="予約削除" @cancel="cancelAction">

      <table class="table" v-if="rsv !== null">
        <tbody>
          <tr>
            <td width="100">予約者名</td>
            <td>{{rsv.name}}</td>
          </tr>
          <tr>
            <td>予約時間</td>
            <td>{{startTime}}</td>
          </tr>
          <tr>
            <td>終了時間</td>
            <td>{{endTime}}</td>
          </tr>
          <tr>
            <td>利用時間</td>
            <td>{{long}}</td>
          </tr>
          <tr>
            <td>テーブル</td>
            <td>{{tableName}}</td>
          </tr>
        </tbody>
      </table>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="cancelAction">キャンセル</button>
        <button type="button" class="btn btn-success" @click="deleteRsvExe">削除</button>
      </div>

    </modal>
  </div>
</template>

<script>
import modal from '@/components/ui/Modal'
import * as timeUtility from '@/common/utils/timeUtility'

export default {
  name: '',
  props: {
    showModal: { type: Boolean, default: () => false },
    rsv: { type: Object, default: () => null },
    tableList: { type: Array, default: () => [] }
  },
  components: {
    modal
  },
  computed: {

  },
  watch: {
    showModal (val) {
      this.showMyModal = val
      if (val) {
        this.init()
      }
    }
  },
  data () {
    return {
      showMyModal: false,
      startTiem: '',
      endTiem: '',
      long: '',
      tableName: ''
    }
  },
  methods: {
    init () {
      // table name
      const tableId = this.rsv.tableId
      if (tableId === '') return '未設定'
      const targetTable = this.tableList.filter((table) => table.id === tableId)[0]
      this.tableName = targetTable.name

      // startTime
      this.startTime = timeUtility.getTimeStrFromPoint(this.rsv.start)

      // endTime
      this.endTime = timeUtility.getTimeStrFromPoint(this.rsv.start + this.rsv.long)

      // use time
      const time = this.rsv.long
      let min = time % 4 * 15
      if (min === 0) min = '00'
      const hour = Math.floor(time / 4)
      this.long = `${hour}時間${min}分`
    },
    cancelAction () {
      this.$emit('close-delete-modal')
    },
    deleteRsvExe () {
      this.$emit('delete-rsv-exe')
    }
  }
}
</script>

<style lang="scss" scoped>
.datepicker {
  padding: 0;
}
</style>
