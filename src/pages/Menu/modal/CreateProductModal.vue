<template>
  <div>
    <modal
    v-model="showModalLocal"
    title="新規商品登録">

      <div v-if="localData !== null">
        <div class="row mb16">
          <div class="col-xs-12 fs11 mb4">
            画像アップローダー（未実装）
          </div>
          <div class="col-xs-4">
            <div class="up-loader" :class="{ active: localData.mainPic === 0 }">
              <i class="fa fa-cloud-upload"></i>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="up-loader" :class="{ active: localData.mainPic === 1 }">
              <i class="fa fa-cloud-upload"></i>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="up-loader" :class="{ active: localData.mainPic === 2 }">
              <i class="fa fa-cloud-upload"></i>
            </div>
          </div>
        </div>

        <div class="row mb16">
          <div class="col-xs-2">
            <label class="control-label">メイン画像</label>
          </div>
          <div class="col-xs-10">
            <label class="radio-inline mr10">
              <input type="radio" v-model="localData.mainPic" :value="0">1
            </label>
            <label class="radio-inline mr10">
              <input type="radio" v-model="localData.mainPic" :value="1">2
            </label>
            <label class="radio-inline mr10">
              <input type="radio" v-model="localData.mainPic" :value="2">3
            </label>
          </div>
        </div>

        <div class="row mb16">
          <div class="col-xs-2">
            <label class="control-label">属性</label>
          </div>
          <div class="col-xs-10">
            <label class="checkbox-inline mr10 new-checkbox">
              <input type="checkbox" id="inlineCheckbox1" v-model="localData.isNew">New
            </label>
            <label class="checkbox-inline mr10 new-checkbox">
              <input type="checkbox" id="inlineCheckbox1" v-model="localData.isLunchOnly">ランチ限定
            </label>
            <label class="checkbox-inline mr10 new-checkbox">
              <input type="checkbox" id="inlineCheckbox1" v-model="localData.allYouCanEat">食べ放題
            </label>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <div class="form-group" :class="{'has-error': nameError}">
              <label class="control-label mr8">商品名（1~20文字）<span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="商品名" v-model="localData.name">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <div class="form-group" :class="{'has-error': descriptionError}">
              <label class="control-label mr8">説明（1~300文字）<span class="text-danger">*</span></label>
              <textarea class="form-control" v-model="localData.description" placeholder="説明文" rows="3"></textarea>
              <!-- <input type="textarea" class="form-control" placeholder="" v-model="localData.name">
              <bs-input label="説明" type="textarea" v-model="localData.description"></bs-input> -->
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-6">
            <label class="control-label">定価（税別）</label>
            <numberInput v-model="localData.price" placeholder=""></numberInput>
          </div>
          <div class="col-xs-6">
            <div class="form-group" :class="{'has-error': discountError && discountBeChange}">
              <label class="control-label mr8">割引率（0~100％）</label>
              <numberInput v-model="localData.discount" placeholder=""></numberInput>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 text-center">
            <hr class="short alt">
            <h3>価格表示</h3>
          </div>
          <div class="col-xs-12 text-center price">
            定価 <price :price="localData.price" :isIncludeTax="false" :discountRate="0" :taxRate="taxRate"></price>,
            <price :price="localData.price" :isIncludeTax="true" :isDiscount="false" :discountRate="0" :taxRate="taxRate"></price>
          </div>

          <div class="col-xs-12 text-center mv8 price text-warning" v-if="isDiscount">
            割引率 {{localData.discount}}%
          </div>

          <div class="col-xs-12 text-center price" v-if="isDiscount">
            割引 <price :price="localData.price" :isIncludeTax="false" :discountRate="localData.discount" :taxRate="taxRate"></price>,
            <price :price="localData.price" :isIncludeTax="true" :discountRate="localData.discount" :taxRate="taxRate"></price>
          </div>
        </div>
      </div>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="close">
          キャンセル
        </button>
        <button v-if="!createMode" type="button" class="btn btn-danger" @click="deleteProduct">
          商品削除
        </button>
        <button type="button" class="btn btn-primary" @click="save" :disabled="!canSave">
          保存
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { input } from 'vue-strap'
import modal from '@/components/ui/Modal'
import numberInput from '@/components/ui/NumberInput'
import price from '@/components/ui/Price'

export default {
  name: 'create-product-modal',
  props: {
    showModal: { type: Boolean, default: () => false },
    createMode: { type: Boolean, default: () => false },
    editData: { type: Object, default: () => null },
    taxRate: { type: Number, default: () => 1 }
  },
  components: {
    modal,
    bsInput: input,
    numberInput,
    price
  },
  computed: {
    canSave () {
      return true
    },
    discountError () {
      const discount = this.localData.discount
      return discount < 0 || discount > 100
    },
    nameError () {
      const name = String(this.localData.name)
      const showError = this.showError
      const stringError = name === '' || name.length < 1 || name.length > 20
      return stringError && showError
    },
    descriptionError () {
      const txt = String(this.localData.description)
      const stringError = txt === '' || txt.length < 1 || txt.length > 300
      return stringError && this.showError
    },
    isDiscount () {
      const discount = this.localData.discount
      return !this.discountError && discount > 0
    }
  },
  watch: {
    showModal (val) {
      if (val !== this.showModalLocal) {
        this.showModalLocal = val
      }
    },
    showModalLocal (val) {
      if (!val) {
        this.showError = false
      }
      if (val !== this.showModal) {
        this.$emit('close-modal')
      }
    },
    editData (val) {
      this.localData = Object.assign({}, val)
    },
    'localData.discount' (val, old) {
      if (old !== val && old !== undefined) {
        this.discountBeChange = true
      }
    }
  },
  data () {
    return {
      showModalLocal: false,
      localData: null,
      dmmy: '',
      showError: false,
      // バリデーション
      // nameError: false,
      // priceError: false,
      discountBeChange: false
      // discountError: false
    }
  },
  created () {

  },
  methods: {
    deleteProduct () {
      this.$emit('delete-product', this.editData)
    },
    save () {
      this.showError = true
      const hasError = this.descriptionError || this.nameError || this.discountError
      // console.log('hasError', hasError)
      if (hasError) return
      // console.log('this.localData)', Object.assign({}, this.localData))
      this.$emit('save', Object.assign({}, this.localData))
    },
    close () {
      this.showModalLocal = false
      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.up-loader {
  border: 1px dashed #ccc;
  background-color: #eee;
  width: 100%;
  height: 110px;

  font-size: 34px;
  text-align: center;
  color: #bbb;
  .fa {
    margin-top: 38px;
  }

  &.active {
    border-color: #4a89dc;
  }
}

.price {
  font-size: 15px;
}

.price-lg {
  font-size: 20px;
  font-weight: bold;
}

.has-error {
  label.new-checkbox {
    color: #666;
  }
}
</style>
