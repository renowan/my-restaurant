<template>
  <tr role="row">
    <td class="text-center"><i class="fa fa-star text-warning"></i></td>
    <td @click="edit">{{table.name}}</td>
    <td @click="edit">{{table.minNum}}人〜{{table.maxNum}}人</td>
    <td @click="edit">{{table.frame}}</td>
    <td @click="edit">999</td>
    <td class="text-right pr">

      <spinner ref="spinner" v-model="isLoading" size="sm" text="" v-if="isLoading"></spinner>

      <list-dropdown text="" class="btn-group-xs" pullRight v-if="!isLoading">
        <li><a href="javascript:void(0)" @click="edit">編集</a></li>
        <li><a href="javascript:void(0)" @click="copy">複製</a></li>
        <li><a href="javascript:void(0)" @click="deleteTable">削除</a></li>
      </list-dropdown>
    </td>
  </tr>
</template>

<script>
import { spinner } from 'vue-strap'
import listDropdown from '@/components/ui/ListDropdown'

export default {
  name: 'table-tr',
  props: {
    table: { type: Object, required: true },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    listDropdown,
    spinner
  },
  computed: {
    isLoading () {
      const id = this.table.id
      return this.uiLoadingList.indexOf(id) > -1
    }
  },
  data () {
    return {
      dmy: true
    }
  },
  methods: {
    deleteTable () {
      if (this.isLoading) return
      this.$emit('table-action', {
        action: 'delete',
        id: this.table.id
      })
    },
    edit () {
      if (this.isLoading) return
      this.$emit('table-action', {
        action: 'edit',
        id: this.table.id
      })
    },
    copy () {
      if (this.isLoading) return
      this.$emit('table-action', {
        action: 'copy',
        id: this.table.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-custom {
  width: 38px;
  // height: 28px;
  display: inline-block;
  position: relative;
  top: -11px;

  label:before {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    border-width: 1px;
    border-color: #CCC;
  }

  input[type=checkbox]:checked + label:after {
    top: 4px;
    left: 2px;
    font-size: 11px;
  }

  label:empty {
    // padding-left: 20px;
  }
}

.pr {
  position: relative;
}

.spinner {
  top: 11px;
  left: 6px;
  background: transparent;
}
</style>
