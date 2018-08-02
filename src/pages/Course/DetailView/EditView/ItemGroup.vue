<template>
  <div class="row mb32">
    <div class="col-xs-12">

      <div class="panel panel-default">
        <div class="panel-heading">
          <span class="panel-title">
            <span class="fa fa-files-o"></span>グループ <span class="text-danger fs11 fw400" v-if="noItem">商品未登録</span>
          </span>
          <div class="pull-right hidden-xs"></div>
        </div>
        <div class="panel-menu">
          <div class="form-group mbn" :class="{'has-error': hasNameError}">
            <input type="text" class="form-control" placeholder="グループ名" v-model="localData.name">
          </div>
        </div>
        <div class="panel-body pn">
          <table class="table">
            <thead>
              <tr>
                <th width="30">#</th>
                <th>商品名</th>
                <th width="80">定価</th>
                <th width="80">数量</th>
                <th width="80">順番</th>
                <th width="60" class="text-center">削除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="localData.item.length < 1">
                <td colspan="6" class="no-item">商品がありません。</td>
              </tr>
              <selectItemTr
              v-for="(item, index) in localData.item"
              :index="index"
              :item="item"
              :productList="productList"
              :productObj="productObj"
              :key="index"
              @change-index="changeIndex"
              @delete-item="deleteItem">
              </selectItemTr>
            </tbody>
          </table>
          <div class="dt-panelfooter clearfix">
            <div class="pull-left">
            </div>
            <div class="pull-right">
              <button type="button" class="btn btn-default btn-sm" @click="showItemModalExe">
                <i class="fa fa-plus"></i> 商品追加
              </button>
              <button type="button" class="btn btn-default btn-sm" @click="deleteGroup" :disabled="!canDeleteGroup">
                <i class="fa fa-times"></i> グループ削除
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <modal
    v-model="showItemModal"
    title="メニュー追加">

      <div class="mb8 text-right">
        カテゴリー <v-select v-model="currentTab" :options="tabList" options-label="name" options-value="id"></v-select>
      </div>

      <productSelector
      :showItemModal="showItemModal"
      :tabList="tabList"
      :selectList="selectList"
      @update-checkbox="updateCheckbox">
      </productSelector>

      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showItemModal = false">
          閉じる
        </button>
      </div>
    </modal>

  </div>
</template>

<script>
import { remove } from 'lodash'
import { select } from 'vue-strap'
import modal from '@/components/ui/Modal'
import productSelector from './ProductSelector'
import selectItemTr from './SelectItemTr'

export default {
  name: 'item-gropu',
  props: {
    group: { type: Object, default: () => null },
    canDeleteGroup: { type: Boolean, default: () => false },
    index: { type: Number, required: true },
    tabList: { type: Array, required: true },
    productList: { type: Array, required: true },
    productObj: { type: Object, required: true }
  },
  components: {
    modal,
    vSelect: select,
    productSelector,
    selectItemTr
  },
  computed: {
    hasNameError () {
      return this.group.errors.indexOf('name') > -1
    },
    noItem () {
      return this.group.errors.indexOf('no-item') > -1
    }
  },
  watch: {
    group (val) {
      this.localData = val
    },
    currentTab (val) {
      this.updateSelectList()
    }
  },
  data () {
    return {
      currentTab: '',
      localData: {},
      showItemModal: false,
      selectList: []
    }
  },
  created () {
    this.localData = this.group
  },
  methods: {
    deleteGroup () {
      this.$emit('delete-group', this.index)
    },
    changeIndex (order) {
      order.groupIndex = this.index
      this.$emit('change-index', order)
    },
    showItemModalExe () {
      this.currentTab = this.tabList[0].id
      this.showItemModal = true
    },
    updateSelectList () {
      const myItem = this.localData.item
      const currentTab = this.currentTab
      const selectList = []

      this.productList.forEach((product) => {
        if (product.tabId === currentTab) {
          const isSelect = myItem.find((elm) => elm.productId === product.id) !== undefined
          selectList.push({
            name: product.name,
            id: product.id,
            price: product.price,
            select: isSelect
          })
        }
      })
      this.selectList = selectList
    },
    updateCheckbox (order) {
      if (order.value) {
        // 追加
        this.localData.item.push({
          productId: order.id,
          value: 1
        })
        this.group.errors = remove(this.group.errors, (elm) => elm !== 'no-item')
      } else {
        const targetId = order.id
        const newItem = this.localData.item.filter((product) => product.productId !== targetId)
        this.localData.item = newItem
      }
    },
    deleteItem (item) {
      const targetId = item.productId
      const newItem = this.localData.item.filter((product) => product.productId !== targetId)
      this.localData.item = newItem
    }
  }
}
</script>

<style lang="scss" scoped>
.item-box-1 {
  border: 1px solid #e5e5e5;
  background: #fafafa;
  // padding: 8px 8px;
  font-size: 16px;
  display: table;
  margin-bottom: 16px;
  width: 100%;

  .cell-name {
    display: table-cell;
    padding: 8px 8px;
    vertical-align: middle;
  }
  .cell-value {
    display: table-cell;
    padding: 8px 0 8px 8px;
    vertical-align: middle;
    width: 120px;
  }
  .cell-btn {
    display: table-cell;
    padding: 8px 0 8px 8px;
    vertical-align: middle;
    width: 86px;
    .btn-group {
      width: 100%;
    }
  }
  .cell-close {
    display: table-cell;
    padding: 8px 0;
    vertical-align: middle;
    text-align: center;
    width: 40px;
  }

  .btn-close {
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 4px;
  }
}
.no-item {
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;
}

.dt-panelfooter {
  padding: 12px 14px;
}
</style>
