<template>
  <div class="left-header" :style="{height: scrollBoxHeight - 1 + 'px'}">
    <table class="left-table" :style="{top: scrollTop * -1 + 'px'}">
      <tbody>

        <tr v-for="(item, index) in trList" :key="'tr-list' + index" :class="item.class">
          <td><div class="table-name">{{item.name}}</div></td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'left-header',
  props: {
    tableMap: { type: Array, required: true },
    maskHeight: { type: Number, default: () => 0 },
    innerHeight: { type: Number, default: () => 0 },
    scrollBoxHeight: { type: Number, default: () => 0 },
    scrollTop: { type: Number, default: () => 0 },
    totalTableFrame: { type: Number, default: () => 0 }
  },
  components: {

  },
  computed: {
    myHeight () {
      const hasScroll = this.maskHeight > this.innerHeight
      const hasScrollHeight = this.innerHeight + 1
      const noneScrollHeight = this.maskHeight
      return hasScroll ? hasScrollHeight : noneScrollHeight
    }
  },
  watch: {
    tableMap () {
      this.createTrList()
    }
  },
  data () {
    return {
      trList: []
    }
  },
  created () {
    this.createTrList()
  },
  methods: {
    createTrList () {
      const trList = []
      this.tableMap.forEach((table, tableIndex) => {
        table.tableMarkup.forEach((line, index) => {
          const classArr = []
          if (index !== 0) classArr.push('dl-minor')
          // table idがnullでなければ、extendにクラスをつける
          if (line.extend && table.info.id !== null) classArr.push('extend')
          const obj = {
            name: index === 0 ? table.info.name : '',
            extend: line.extend,
            class: classArr
          }
          trList.push(obj)
        })
      })
      this.trList = trList
    }
  }
}
</script>

<style lang="scss" scoped>
.left-header {
  width: 121px;
  // height: 91px;
  // min-height: 184px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  font-weight: 600;
  // border-right: 1px solid #ddd;
  overflow: hidden;
  z-index: 1000;
}

.table-name {
  padding-right: 8px;
}

.left-table {
  width: 100%;
  position: absolute;
  border-right: 1px solid #ddd;
}

td {
  padding: 1px 8px 0;
  font-size: 10px;
  line-height: 1;
  position: relative;
  height: 30px;
  vertical-align: middle;
  border-top: 1px solid #ddd;
  // border-bottom: 0;
  // border-left: 0;
  // border-right: 0;
}

tr:last-child {
  td {
    border-bottom: 1px solid #ddd;
  }
}

.dl-minor td {
  border-top: 1px dotted #ececec;
}

.extend td {
  border-right: 4px solid #ed7764;
  // background-image: url('/static/images/extend-bg.gif');
}

// tr:first-child td {
//   border-top: 0;
// }
</style>
