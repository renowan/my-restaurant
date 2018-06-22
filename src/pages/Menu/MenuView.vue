<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">

    <page-tab v-model="currentTab" :tabList="tabList" @new-tab="showNewTabModal = true"></page-tab>

    <div class="container-fluid mb24">
      <div class="row">
        <div class="col-xs-12 text-right">
          <button type="button" class="btn btn-primary" @click="createProduct">
            商品追加
          </button>
          <button type="button" class="btn btn-info" @click="showUpdateTabModal = true">
            カテゴリ名変更
          </button>
          <button type="button" class="btn btn-danger" @click="showDeleteTabModal = true">
            カテゴリ削除
          </button>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <productPanel
          v-for="(product, index) in productList"
          :key="index"
          :product="product"
          :taxRate="app.taxRate"
          @edit-product="editProduct">
          </productPanel>
        </div>
      </div>
    </div>

    <modal
    v-model="showDeleteProductModal"
    title="商品削除">
      <div class="text-delete text-danger" v-if="deleteTarget">
        商品「{{deleteTarget.name}}」を削除します<br>よろしいですか？
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showDeleteProductModal = false">
          キャンセル
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProductExe">
          削除
        </button>
      </div>
    </modal>

    <tabControlModal
    :showNewTabModal="showNewTabModal"
    :showDeleteTabModal="showDeleteTabModal"
    :showUpdateTabModal="showUpdateTabModal"
    :currentTabName="currentTabName"
    :tabLength="tabList.length"
    @update-tab-name="updateTabName"
    @create-tab="createTab"
    @delete-tab="deleteTab"
    @close-modal="closeModal">
    </tabControlModal>

    <createProductModal
    :showModal="showCreateProductModal"
    :createMode="createMode"
    :editData="editData"
    :taxRate="app.taxRate"
    @close-modal="closeModal"
    @delete-product="deleteProduct"
    @save="saveProduct">
    </createProductModal>

  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import contentWrapper from '@/components/Layout/ContentWrapper'
import modal from '@/components/ui/Modal'
import { getDefaultData } from '@/common/constant/defaultData'
import pageTab from './components/PageTab'
import productPanel from './components/ProductPanel'
import tabControlModal from './modal/TabControlModal'
import createProductModal from './modal/CreateProductModal'

export default {
  name: 'menu-view',
  components: {
    contentWrapper,
    modal,
    pageTab,
    productPanel,
    tabControlModal,
    createProductModal
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      menu: 'menu/state',
      productList: 'menu/productList',
      tabList: 'menu/tabList'
    }),
    {
      currentTab: {
        get () {
          return this.menu.currentTab
        },
        set (val) {
          this.$store.dispatch('menu/updateCurrentTab', val)
        }
      },
      currentTabName () {
        if (!this.tabList.length) return ''
        return this.tabList[this.currentTab].name || ''
      },
    }
  ),
  watch: {

  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'メニュー', link: null }
      ],
      newTabName: '',
      editData: null,
      showNewTabModal: false,
      showCreateProductModal: false,
      showUpdateTabModal: false,
      showDeleteTabModal: false,
      showDeleteProductModal: false,
      createMode: false,
      deleteTarget: null
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
    } else {
      this.$store.dispatch('menu/getMenu')
    }
  },
  methods: {
    getMenu () {
      this.$store.dispatch('menu/getMenu')
    },
    // getMenuItem () {
    //   this.$store.dispatch('menu/getMenuItem')
    // },
    createTab (newTabName) {
      this.$store.dispatch('menu/createTab', newTabName)
      this.showNewTabModal = false
    },
    updateTabName (newTabName) {
      this.$store.dispatch('menu/updateTabName', newTabName)
    },
    deleteTab () {
      this.$store.dispatch('menu/deleteTab')
    },
    createProduct () {
      const editData = getDefaultData('menu')
      this.editData = editData
      this.createMode = true
      this.showCreateProductModal = true
    },
    editProduct (product) {
      this.createMode = false
      this.editData = cloneDeep(product)
      this.showCreateProductModal = true
    },
    deleteProduct (product) {
      this.deleteTarget = product
      this.showCreateProductModal = false
      setTimeout(() => {
        this.showDeleteProductModal = true
      }, 100)
    },
    deleteProductExe () {
      this.showDeleteProductModal = false
      this.$store.dispatch('menu/deleteProduct', this.deleteTarget.id)
    },
    closeModal () {
      this.showNewTabModal = false
      this.showCreateProductModal = false
      this.showUpdateTabModal = false
      this.showDeleteTabModal = false
    },
    saveProduct (product) {
      if (this.createMode) {
        this.$store.dispatch('menu/addProduct', product)
      } else {
        this.$store.dispatch('menu/updateProduct', product)
      }
      this.showCreateProductModal = false
    },
    // test1 () {
    //   const editData = getDefaultData('menu')
    //   this.editData = editData
    //   this.createProduct()
    // }
  }
}
</script>

<style lang="scss" scoped>
.bg-white {
  background-color: #fff;
}

.text-delete {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0;
}
</style>
