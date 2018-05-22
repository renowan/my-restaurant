<template>
  <div class="row">
    <div class="col-xs-12 mb16">
      <rsv-state v-model="localData.state"></rsv-state>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">予約日</label>
        <div>
          <calendar
          v-model="calValue"
          :format="format"
          :has-input="true"
          justified
          ></calendar>
        </div>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">人数</label>
        <input type="text" class="form-control" placeholder="" v-model.number="localData.num">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">予約時間</label>
        <timePicker v-model="localData.start"></timePicker>
        <!-- <input type="text" class="form-control" placeholder="" v-model="localData.start"> -->
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">利用時間</label>
        <useTimePicker v-model="localData.long"></useTimePicker>
        <!-- <input type="text" class="form-control" placeholder="" v-model="localData.long"> -->
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group" :class="{'has-error': nameError}">
        <label for="inputStandard" class="control-label">お名前 <span class="text-danger">*</span></label>
        <input type="text" class="form-control" placeholder="" v-model="localData.name">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">お名前カナ（任意）</label>
        <input type="text" class="form-control" placeholder="" v-model="localData.nameKana">
      </div>
    </div>

    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">電話（任意）</label>
        <input type="text" class="form-control" placeholder="" v-model="localData.tel">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label for="inputStandard" class="control-label">支払い金額</label>
        <input type="text" class="form-control" placeholder="" v-model.number="localData.pay">
      </div>
    </div>
    <div class="col-xs-9 mb16">
      <div>
        <label for="inputStandard" class="control-label">テーブル</label>
      </div>
      <div class="btn-group-justified">
        <v-select v-model="localData.tableId" :options="tableList" options-value="id" options-label="name"
        :limit="3"
        placeholder="テーブルを選択"
        search justified
        close-on-select>
        </v-select>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="form-group">
        <label for="inputStandard" class="control-label">テーブルフレーム</label>
        <input type="text" class="form-control" placeholder="" v-model.number="localData.tableFrame">
      </div>
    </div>
    <div class="col-xs-12">
      <div class="form-group">
        <bs-input label="メモ" type="textarea" v-model="localData.memo"></bs-input>
      </div>
    </div>
  </div>
</template>

<script>
import { select, input } from 'vue-strap'
import calendar from '@/components/ui/Calendar'
import timePicker from '@/components/ui/TimePicker'
import useTimePicker from '@/components/ui/UseTimePicker'
import rsvState from '@/components/RsvForm/RsvState'

const changeDateFormat = (val, format) => {
  if (val.indexOf('/') > -1) {
    return val.replace(/\//g, '')
  } else {
    const y = val.slice(0, 4)
    const m = val.slice(4, 6)
    const d = val.slice(6, 8)
    return `${y}/${m}/${d}`
  }
}

export default {
  name: 'rsv-form-set',
  props: {
    rsvData: { type: Object, required: true },
    tableList: { type: Array, default: () => [] },
    nameError: { type: Boolean, default: () => false }
  },
  components: {
    calendar,
    rsvState,
    vSelect: select,
    bsInput: input,
    timePicker,
    useTimePicker
  },
  computed: {
    calValue: {
      get () {
        return changeDateFormat(String(this.localData.date))
      },
      set (val) {
        const date = changeDateFormat(val)
        this.localData.date = Number(date)
      }
    }
  },
  data () {
    return {
      localData: {
        date: '',
        state: 0,
        pay: 0,
        num: 2,
        tableId: '',
        tel: '',
        courseId: '',
        name: '',
        nameKana: '',
        memo: '',
        long: 8,
        start: 12
      },
      format: 'yyyy/MM/dd',
    }
  },
  watch: {
    rsvData (val) {
      this.localData = Object.assign({}, val)
    },
    localData: {
      handler (val) {
        if (!(JSON.stringify(val) === JSON.stringify(this.rsvData))) {
          console.log('onchange')
          this.$emit('input-on-change', val)
        }
      },
      deep: true
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.datepicker {
  padding: 0;
}
</style>
