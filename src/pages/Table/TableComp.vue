<template>

  <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
    <div class="dt-panelmenu clearfix">
      <div class="dataTables_length" id="datatable2_length">
        <button type="button" class="btn btn-default btn-sm" @click="createTable">
          <i class="fa fa-plus"></i> 新規テーブル
        </button>
        <button type="button" class="btn btn-default btn-sm btn-keisai" @click="getTable">
          <i class="fa fa-refresh"></i> 更新
        </button>
        <div class="btn-group">
          <button type="button" class="btn btn-default btn-sm btn-keisai">
            <i class="fa fa-star text-warning"></i> 掲載
          </button>
          <button type="button" class="btn btn-default btn-sm btn-keisai">
            <i class="fa fa-star-o"></i> 非掲載
          </button>
        </div>
      </div>
      <div id="datatable2_filter" class="dataTables_filter">
        <label>
          検索: <input type="search" v-model="filter" class="form-control input-sm" placeholder="テーブル名" aria-controls="datatable2">
        </label>
      </div>
    </div>
    <table class="table table-striped table-hover dataTable no-footer">
      <thead>
        <tr role="row">
          <th class="text-center" style="width: 50px;">掲載</th>
          <th class="" style="width: 251px;">テーブル名</th>
          <th class="" style="width: 120px;">人数</th>
          <th class="" style="width: 56px;">枠数</th>
          <th class="sorting_disabled" rowspan="1" colspan="1">属性</th>
          <th class="" style="width: 56px;"></th>
        </tr>
      </thead>
      <tbody>
        <table-tr
        v-for="(table, index) in myList"
        :table="table"
        :uiLoadingList="uiLoadingList"
        :key="'table-tr-' + index"
        @table-action="tableAction">
        </table-tr>
      </tbody>
    </table>
    <div class="dt-panelfooter clearfix">
      <div class="dataTables_info" id="datatable3_info" role="status" aria-live="polite">
        Showing x to x of {{tableList.length}} entries
      </div>
      <div class="dataTables_paginate paging_simple_numbers" id="datatable3_paginate">
        <ul class="pagination">
          <li class="paginate_button active" aria-controls="datatable3" tabindex="0"><a href="#">1</a></li>
          <li class="paginate_button " aria-controls="datatable3" tabindex="0"><a href="#">2</a></li>
          <li class="paginate_button " aria-controls="datatable3" tabindex="0"><a href="#">3</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from '@/components/ui/Dropdown'
import tableTr from './TableTr'

export default {
  name: 'table-comp',
  props: {
    tableList: { type: Array, default: () => [] },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    dropdown,
    tableTr
  },
  data () {
    return {
      myList: [],
      filter: ''
    }
  },
  watch: {
    tableList (val) {
      this.init()
    },
    filter (val) {
      if (val === '') {
        this.myList = this.tableList
      } else {
        this.myList = this.tableList.filter((table) => table.name.indexOf(val) > -1)
      }
    }
  },
  methods: {
    init () {
      this.myList = this.tableList
    },
    getTable () {
      this.$emit('get-table')
    },
    createTable () {
      this.$emit('open-create-table')
    },
    tableAction (e) {
      this.$emit('table-action', e)
    }
  }
}
</script>

<style lang="scss" scoped>
div.dataTables_paginate {
  float: right;
}

.pagination {
  margin: 2px 0;
  white-space: nowrap;
}

.w60 { width: 60px; }
.w70 { width: 70px; }
.w80 { width: 80px; }
</style>
