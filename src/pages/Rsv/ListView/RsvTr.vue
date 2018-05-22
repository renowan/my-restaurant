<template>
  <tr>
    <td class="pl24" @click="edit"><state-label :state="rsv.state"></state-label></td>
    <td class="text-left" @click="edit">
      {{timeTxt}}
    </td>
    <td class="" @click="edit">{{serviceTime}}</td>
    <td class="" @click="edit">{{rsv.name}}</td>
    <td class="" @click="edit">{{rsv.num}}</td>
    <td class="" @click="edit">{{tableName}}</td>
    <td class="pr24 text-right pr">
      <spinner ref="spinner" v-model="isLoading" size="sm" text="" v-if="isLoading"></spinner>

      <list-dropdown text="" class="btn-group-xs" pullRight v-if="!isLoading">
        <li><a href="javascript:void(0)" @click="edit">編集</a></li>
        <li><a href="javascript:void(0)" @click="copy">複製</a></li>
        <li><a href="javascript:void(0)" @click="deleteRsv">削除</a></li>
      </list-dropdown>
    </td>
  </tr>
</template>

<script>
import { spinner } from 'vue-strap'
import listDropdown from '@/components/ui/ListDropdown'
import { getTimeStrFromPoint } from '@/common/utils/timeUtility'
import StateLabel from '@/components/RsvField/StateLabel'

export default {
  name: 'rsv-tr',
  props: {
    rsv: { type: Object, required: true },
    tableList: { type: Array, default: () => [] },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    StateLabel,
    listDropdown,
    spinner
  },
  computed: {
    timeTxt () {
      return getTimeStrFromPoint(this.rsv.start, 'HH:mm')
    },
    serviceTime () {
      const long = this.rsv.long
      const _time = long * 15

      // const _time = Number(time)
      const _t = Math.floor(_time / 60)
      let _m = _time % 60
      _m = _m === 0 ? '00' : _m
      return `${_t}時間${_m}分`
    },
    tableName () {
      const result = this.tableList.filter((table) => {
        return this.rsv.tableId === table.id
      })
      return result.length ? result[0].name : '不明'
    },
    isLoading () {
      const id = this.rsv.id
      return this.uiLoadingList.indexOf(id) > -1
    }
  },
  methods: {
    deleteRsv () {
      this.$emit('rsv-action', {
        action: 'delete',
        id: this.rsv.id
      })
    },
    edit () {
      this.$emit('rsv-action', {
        action: 'edit',
        id: this.rsv.id
      })
    },
    copy () {
      this.$emit('rsv-action', {
        action: 'copy',
        id: this.rsv.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pr {
  position: relative;
}

.spinner {
  top: 11px;
  left: 6px;
  background: transparent;
}
</style>
