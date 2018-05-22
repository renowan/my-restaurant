<template>
  <div class="sheet" :style="{height: maskHeight + 30 + 'px'}">

    <sheetHeader :posi="posi"></sheetHeader>

    <div class="body-container">

      <div class="dl-scroll-box" @scroll="domScroll" ref="scrollBox" :style="{height: maskHeight + 'px'}">
        <div class="drap-area-inner" :style="{height: innerHeight + 'px'}">

          <div class="drag-item-container table-extend-bg-container" :style="{height: innerHeight + 'px'}">
            <tableExtendBg
            v-for="(table, index) in tableMap"
            :table="table"
            :constants="constants"
            :key="'t-bg' + index">
          </tableExtendBg>
          </div>

          <timeLineGrid
          :innerHeight="innerHeight" :tableMap="tableMap">
          </timeLineGrid>

          <div class="drag-item-container" :style="{height: innerHeight + 'px'}">
            <tableItemContainer
            v-for="(table, index) in tableMap"
            :table="table"
            :constants="constants"
            :onSelectId="onSelectId"
            :key="'t-i-c' + index"
            :uiLoadingList="uiLoadingList"
            @create-rsv="createRsv"
            @on-select="onSelect"
            @on-change-drag-item="onChangeDragItem">
            </tableItemContainer>
          </div>

        </div>
      </div>

      <leftHeader
      :scrollTop="posi.scrollTop"
      :tableMap="tableMap"
      :innerHeight="innerHeight"
      :maskHeight="maskHeight"
      :scrollBoxHeight="posi.scrollBoxHeight"
      :totalTableFrame="totalTableFrame">
      </leftHeader>

    </div>
  </div>
</template>

<script>
import constants from './constants'
import sheetHeader from './SheetHeader'
import timeLineGrid from './TimeLineGrid'
import tableExtendBg from './TableExtendBg'
import leftHeader from './LeftHeader'
import tableItemContainer from './TableItemContainer'

import tableList from './table.json'
import rsvList from './rsv.json'
import TableGroupMap from './TableGroupMap'

const tgp = new TableGroupMap()
tgp.init({
  tableData: tableList,
  selfRsvData: [],
  rsvData: rsvList
})

// console.log(tgp.getMap())

export default {
  name: 'sheet-view',
  props: {
    rsvList: { type: Array, default: () => [] },
    tableList: { type: Array, default: () => [] },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    sheetHeader,
    timeLineGrid,
    tableExtendBg,
    leftHeader,
    tableItemContainer
  },
  computed: {
    totalTableFrame () {
      return this.tableMap.reduce((previous, current) => {
        return previous + current.tableMarkup.length
      }, 0)
    },
    innerHeight () {
      // 20はバッファ
      return this.constants.SQUARES_HEIGHT * this.totalTableFrame - 0
    },
    maskHeight () {
      // スクロールエリア以外の高さ = 191
      const offsetTop = 191 + 44
      const baseHeight = this.posi.windowHeight - offsetTop
      return baseHeight
      // return Math.min(this.innerHeight + 16, baseHeight)
    }
  },
  watch: {
    rsvList () {
      this.createTableMap()
    }
  },
  data () {
    return {
      posi: {
        scrollTop: 0,
        scrollLeft: 0,
        windowHeight: 0,
        // スクロールボックスの中身の高さ
        scrollBoxHeight: 0,
      },
      constants,
      tableMap: [],
      onSelectId: ''
    }
  },
  created () {
    this.windowResize()
    this.createTableMap()
  },
  mounted () {
    window.addEventListener('resize', this.windowResize)
    this.windowResize()
  },
  methods: {
    createTableMap () {
      tgp.init({
        tableData: this.tableList,
        rsvData: this.rsvList
      })
      this.tableMap = tgp.getMap()
    },
    windowResize () {
      this.posi.windowHeight = window.innerHeight
      if (this.$refs.scrollBox) {
        this.posi.scrollBoxHeight = this.$refs.scrollBox.clientHeight
      }
    },
    domScroll (e) {
      this.posi.scrollTop = e.target.scrollTop
      this.posi.scrollLeft = e.target.scrollLeft
    },
    onSelect (id) {
      this.onSelectId = id
      this.$emit('on-select', id)
    },
    createRsv (request) {
      this.$emit('create-rsv', request)
    },
    onChangeDragItem (order) {
      this.$emit('on-change-drag-item', order)
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet {
  width: 100%;
  // min-height: 560px;
  // border-top: 1px solid #ddd;
}

.body-container {
  font-size: 12px;
  // height: 106px;
  min-height: 200px;
  // background-color: #fff;
  position: relative;
  // border-right: 1px solid #ddd;
}

.dl-scroll-box {
  width: 100%;
  height: 100%;
  // height: 106px;
  // min-height: 200px;
  // max-height: 800px;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: scroll;
  background-color: #fff;
}

.drap-area-inner {
  width: 2880px;
  height: 100%;
  left: 121px;
  position: absolute;
}

.drag-item-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 995;
  // top: 1px;
}

.table-extend-bg-container {
  z-index: 900;
}
</style>
