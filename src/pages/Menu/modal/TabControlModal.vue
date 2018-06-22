<template>
  <div>

    <modal
    v-model="showNewTabModalLocal"
    title="新規カテゴリ"
    small>
      <div>
        <label class="control-label">カテゴリ名（10文字以内）</label>
      </div>
      <div>
        <input type="text" class="form-control" placeholder="カテゴリ名" v-model="newTabNameLocal">
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">
          キャンセル
        </button>
        <button type="button" class="btn btn-primary" @click="createTab" :disabled="!canCreateTab">
          決定
        </button>
      </div>
    </modal>

    <modal
    v-model="showUpdateTabModalLocal"
    title="カテゴリ名変更"
    small>
      <div>
        <label class="control-label">カテゴリ名カテゴリ名（10文字以内）</label>
      </div>
      <div>
        <input type="text" class="form-control" placeholder="カテゴリ名" v-model="newTabNameLocal">
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">
          キャンセル
        </button>
        <button type="button" class="btn btn-primary" @click="updateTabName" :disabled="!canCreateTab">
          決定
        </button>
      </div>
    </modal>

    <modal
    v-model="showDeleteTabModalLocal"
    title="カテゴリ削除">
      <div class="text-delete text-danger">
        カテゴリおよびカテゴリに登録された商品がすべて削除されます。<br>よろしいですか？
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">
          キャンセル
        </button>
        <button type="button" class="btn btn-danger" @click="deleteTab">
          決定
        </button>
      </div>
    </modal>

    <!-- カテゴリ操作エラー -->
    <modal
    v-model="showErrorModal"
    title="カテゴリ">
      <div class="text-delete text-danger">
        {{errorMsg}}
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showErrorModal = false">
          閉じる
        </button>
      </div>
    </modal>

  </div>
</template>

<script>
import modal from '@/components/ui/Modal'

const TAB_MAX = 5

export default {
  name: 'tab-control-modal',
  props: {
    tabLength: { type: Number, default: () => 1 },
    currentTabName: { type: String, default: () => '' },
    showNewTabModal: { type: Boolean, default: () => false },
    showUpdateTabModal: { type: Boolean, default: () => false },
    showDeleteTabModal: { type: Boolean, default: () => false }
  },
  components: {
    modal
  },
  computed: {
    canCreateTab () {
      const newTabNameLocal = this.newTabNameLocal
      return newTabNameLocal !== '' && newTabNameLocal.length < 11
    }
  },
  watch: {
    showUpdateTabModal (val) {
      this.showUpdateTabModalLocal = val
      if (val) {
        this.newTabNameLocal = this.currentTabName
      }
    },
    showNewTabModal (val) {
      if (this.tabLength >= TAB_MAX) {
        this.showErrorModal = true
        this.errorMsg = 'カテゴリをこれ以上追加できません。'
        this.$emit('close-modal')
        return
      }
      this.showNewTabModalLocal = val
    },
    showDeleteTabModal (val) {
      if (this.tabLength < 2) {
        this.errorMsg = 'カテゴリをこれ以上削除できません。'
        this.showErrorModal = true
        this.$emit('close-modal')
        return
      }
      this.showDeleteTabModalLocal = val
    },
    showUpdateTabModalLocal (val) {
      if (val !== this.showUpdateTabModal) {
        this.close()
      }
    },
    showNewTabModalLocal (val) {
      if (val !== this.showNewTabModal) {
        this.close()
      }
    },
    showDeleteTabModalLocal (val) {
      if (val !== this.showDeleteTabModal) {
        this.close()
      }
    }
  },
  data () {
    return {
      showUpdateTabModalLocal: false,
      showNewTabModalLocal: false,
      showDeleteTabModalLocal: false,
      newTabNameLocal: '',
      showErrorModal: false,
      errorMsg: ''
    }
  },
  created () {

  },
  methods: {
    init () {
      this.newTabNameLocal = ''
    },
    updateTabName () {
      if (!this.canCreateTab) return
      this.$emit('update-tab-name', this.newTabNameLocal)
      this.close()
    },
    createTab () {
      if (!this.canCreateTab) return
      this.$emit('create-tab', this.newTabNameLocal)
      this.close()
    },
    deleteTab () {
      this.$emit('delete-tab')
      this.close()
    },
    close () {
      this.$emit('close-modal')
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.text-delete {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0;
}
</style>
