<template>
  <content-wrapper :breadcrumb="breadcrumb">

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">
          <span class="fa fa-th"></span> テーブル一覧
        </div>
      </div>

      <div class="panel-body pn">

        <table-comp
        :tableList="tableList"
        :uiLoadingList="app.uiLoadingList"
        @table-action="tableAction"
        @get-table="getTable"
        @open-create-table="showCreateTableModal = true">
        </table-comp>

        <createTableModal
        :showModal="showCreateTableModal"
        @create-table="createTable"
        @close-create-modal="closeModal">
        </createTableModal>

        <table-editer-modal
        :showModal="showTableEditerModal"
        :table="editData"
        @table-edit-exe="tableEditExe"
        @close-create-modal="closeEditerModal">
        </table-editer-modal>

      </div>
    </div>

    <div slot="topBarRight">
      <button type="button" class="btn btn-default btn-sm">
        x
      </button>
    </div>

  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'
import { modal } from 'vue-strap'
import { cloneDeep } from 'lodash'
import tableComp from './TableComp'
import createTableModal from './CreateTableModal'
import tableEditerModal from './TableEditerModal'

export default {
  name: 'table-view',
  components: {
    contentWrapper,
    tableComp,
    modal,
    createTableModal,
    tableEditerModal
  },
  computed: Object.assign(
    {},
    mapGetters({
      app: 'app/state',
      uid: 'app/uid',
      tableList: 'table/list'
    }),
    {}
  ),
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'テーブル', link: null }
      ],
      editData: null,
      showCreateTableModal: false,
      showTableEditerModal: false
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
      return
    }
    this.$store.dispatch('table/getTable')
  },
  methods: {
    tableAction (e) {
      const { action, id } = e
      switch (action) {
        case 'delete':
          this.$store.dispatch('table/delete', id)
          break
        case 'edit':
          this.tableEdit(id)
          break
        case 'copy':
          console.log('any copy', id)
          this.showTableEditerModal = true
          break
        default:
          break
      }
    },
    createTable (e) {
      this.$store.dispatch('table/create', e)
      this.showCreateTableModal = false
    },
    tableEdit (id) {
      const targetTable = this.tableList.filter((table) => {
        return table.id === id
      })
      this.editData = cloneDeep(targetTable[0])
      this.showTableEditerModal = true
    },
    tableEditExe (e) {
      this.$store.dispatch('table/update', this.editData)
      this.showTableEditerModal = false
    },
    closeModal () {
      this.showCreateTableModal = false
    },
    closeEditerModal () {
      this.showTableEditerModal = false
    },
    getTable () {
      this.$store.dispatch('table/getTable')
    }
  }
}
</script>

<style lang="scss" scoped>
.data-list-tool-bar {
  padding: 8px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  // height: 38px;
}

.myinput {
  width: 70%;
}

.data-list {
  padding: 0;
  margin: 0;

  li {
    font-size: 12px;
    padding: 14px 16px 12px;
    list-style-type: none;
    border-bottom: 1px solid #e5e5e5;
  }

  .table-name {
    width: 40%;
    display: inline-block;
  }

  .table-frame-min {
    width: 60px;
    display: inline-block;
  }
  .icon-box {
    display: inline-block;
  }

  .label-default {
    background-color: #dadada;
    color: #a9a9a9;
  }
}

.message-unread {
  cursor: pointer;
}

.btn-keisai {
  width: 80px;
}
</style>

<style src="../../../static/assets/admin-tools/admin-forms/css/admin-forms.min.css" scoped></style>
