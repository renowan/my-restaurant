<template>
  <div>
    <modal v-model="showMyModal" title="予約登録" @cancel="cancelAction">

      <rsv-form-set
      :rsv-data="rsvData"
      :tableList="tableList"
      :courseList="courseListLocal"
      :numError="numError"
      :nameError="nameError"
      :payError="payError"
      :tableFrameError="tableFrameError"
      @input-on-change="inputOnChange">
      </rsv-form-set>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="cancelAction">キャンセル</button>
        <button type="button" class="btn btn-success" @click="save">保存</button>
      </div>

    </modal>
  </div>
</template>

<script>
import { select, input } from 'vue-strap'
import modal from '@/components/ui/Modal'
import calendar from '@/components/ui/Calendar'
import rsvState from '@/components/RsvForm/RsvState'
import rsvFormSet from './RsvFormSet'
import useTimePicker from '@/components/ui/UseTimePicker'
import { getDefaultData } from '@/common/constant/defaultData'

export default {
  name: 'create-rsv-modal',
  props: {
    showModal: { type: Boolean, default: () => false },
    today: { type: String, default: () => 20181201 },
    modalType: { type: String, default: () => 'create' },
    tableList: { type: Array, default: () => [] },
    courseList: { type: Array, default: () => [] },
    editData: { type: Object, default: () => null },
    createRequest: { type: Object, default: () => null }
  },
  components: {
    modal,
    vSelect: select,
    calendar,
    bsInput: input,
    rsvState,
    rsvFormSet,
    useTimePicker
  },
  computed: {

  },
  watch: {
    showModal (val) {
      this.showMyModal = val
      if (val) {
        this.init()
      } else {
        this.resetData()
      }
    }
  },
  data () {
    return {
      showMyModal: false,
      tableId: 0,
      format: 'yyyy/MM/dd',
      rsvData: null,
      canSave: true,
      // バリ
      numError: false,
      nameError: false,
      payError: false,
      tableFrameError: false,
      courseListLocal: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.modalType === 'create') {
        this.rsvData = getDefaultData('rsv')
        this.rsvData.date = Number(this.today)
        // 指定のテーブル・時間があるか
        if (this.createRequest !== null) {
          this.rsvData = Object.assign(this.rsvData, this.createRequest)
        }
      } else {
        this.rsvData = Object.assign({}, this.editData)
      }
      this.courseListLocal = [{
        name: '未設定',
        id: ''
      }].concat(this.courseList)
      // this.resetData()
    },
    cancelAction () {
      this.$emit('close-create-modal')
    },
    checkCanSave () {
      let canSave = true
      if (!this.rsvData.num) {
        canSave = false
        this.numError = true
      } else {
        this.numError = false
      }
      if (this.rsvData.name === '') {
        canSave = false
        this.nameError = true
      } else {
        this.nameError = false
      }
      if (this.rsvData.pay === undefined) {
        canSave = false
        this.payError = true
      } else {
        this.payError = false
      }
      if (this.rsvData.tableFrame === undefined) {
        canSave = false
        this.tableFrameError = true
      } else {
        this.tableFrameError = false
      }

      this.canSave = canSave
    },
    save () {
      this.checkCanSave()
      if (!this.canSave) return
      this.$emit('create-rsv', this.rsvData)
      this.resetData()
    },
    resetData () {
      this.canSave = true
      this.numError = false
      this.nameError = false
      this.payError = false
      this.tableFrameError = false
    },
    inputOnChange (e) {
      this.rsvData = e
    }
  }
}
</script>

<style lang="scss" scoped>
.datepicker {
  padding: 0;
}
</style>
