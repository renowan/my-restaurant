<template>
  <div class="row">
    <div class="col-xs-12 mv8">
      <!-- <checkbox v-model="localData.enable" type="primary" class="ib">掲載</checkbox> （掲載をオフにすると予約から選択できなくなる。） -->
      <label class="checkbox-inline mr10">
        <input type="checkbox" id="inlineCheckbox1" value="option1" v-model="localData.enable">掲載
      </label>（掲載をオフにすると予約から選択できなくなる。）
    </div>
    <div class="col-xs-12 mt8">
      <div class="form-group">
        <label class="control-label">テーブル名</label>
        <input name="name" placeholder="テーブル名" type="text" class="form-control" v-model="localData.name">
      </div>
    </div>
    <div class="col-xs-12">
      <div class="form-group">
        <label class="control-label">枠数</label>
        <input name="frame" placeholder="" type="text" class="form-control" v-model="localData.frame">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label class="control-label">最小人数</label>
        <input name="minNum" placeholder="" type="text" class="form-control" v-model="localData.minNum">
      </div>
    </div>
    <div class="col-xs-6">
      <div class="form-group">
        <label class="control-label">最大人数</label>
        <input name="maxNum" placeholder="" type="text" class="form-control" v-model="localData.maxNum">
      </div>
    </div>
    <div class="col-xs-12">
      <div class="form-group">
        <label class="control-label">メモ</label>
        <textarea name="memo" v-model="localData.memo" placeholder="" type="text" class="form-control" rows="3"></textarea>
      </div>
    </div>

  </div>
</template>

<script>
import { input } from 'vue-strap'

export default {
  name: 'table-form-core',
  components: {
    bsInput: input,
  },
  props: {
    table: { type: Object, required: true }
  },
  created () {
    this.localData = this.table
  },
  watch: {
    table (val) {
      this.localData = val
    },
    localData: {
      handler (val) {
        this.$emit('on-update', val)
      },
      deep: true
    }
  },
  data () {
    return {
      localData: {
      }
    }
  }
}
</script>

<style lang="css">
</style>
