<template>
  <div>
    <modal v-model="showMyModal" title="テーブル登録" @cancel="cancelAction">

      <table-form-core v-if="localData" :table="localData" @on-update="onUpdate">
      </table-form-core>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="cancelAction">キャンセル</button>
        <button type="button" class="btn btn-success" @click="save">保存</button>
      </div>

    </modal>
  </div>
</template>

<script>
import { modal } from 'vue-strap'
import tableFormCore from './TableFormCore'

export default {
  name: 'table-editer-modal',
  props: {
    showModal: { type: Boolean, default: () => false },
    table: { type: Object, default: () => null },
  },
  components: {
    modal,
    tableFormCore
  },
  watch: {
    showModal (val) {
      this.showMyModal = val
      if (val) {
        this.init()
      }
    },
    table (val) {
      console.log('table was change', val)
      this.localData = val
    }
  },
  data () {
    return {
      localData: null,
      showMyModal: false,
      canSave: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.localData = this.table
      this.canSave = true
    },
    cancelAction () {
      this.$emit('close-create-modal')
    },
    checkCanSave () {
    },
    onUpdate (e) {
      this.localData = e
    },
    save () {
      this.$emit('table-edit-exe', this.localData)
    },
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-block;
}
</style>
