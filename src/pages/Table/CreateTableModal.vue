<template>
  <div>
    <modal v-model="showMyModal" title="テーブル登録" @cancel="cancelAction">

      <table-form-core
      v-if="showMyModal"
      :table="table"
      @on-update="onUpdate">
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
import { getDefaultData } from '@/common/constant/defaultData'

export default {
  name: 'create-table-modal',
  props: {
    showModal: { type: Boolean, default: () => false },
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
    }
  },
  data () {
    return {
      table: null,
      showMyModal: false,
      canSave: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.table = Object.assign({}, getDefaultData('table'))
      this.canSave = true
    },
    cancelAction () {
      this.$emit('close-create-modal')
    },
    checkCanSave () {
    },
    onUpdate (e) {
      this.table = e
    },
    save () {
      this.$emit('create-table', this.table)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: inline-block;
}
</style>
