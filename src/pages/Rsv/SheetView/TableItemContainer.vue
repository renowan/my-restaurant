<template>
  <div class="table-item-container" :style="style">

    <!-- <div class="extend-area" :style="{ top: extendAreaY + 'px', height: extendAreaH + 'px' }"></div> -->
    <div class="table-click-area" :style="style" @click="clickTable"></div>

    <template v-for="(line, lineIndex) in table.tableMarkup">
      <dragItem
      v-for="(rsv, rsvIndex) in line.rsvList"
      :rsv="rsv"
      :constants="constants"
      :index="lineIndex"
      :onSelectId="onSelectId"
      :key="'dgi' + lineIndex + '-' + rsvIndex"
      :uiLoadingList="uiLoadingList"
      @on-select="onSelect"
      @on-change-drag-item="onChangeDragItem">
      </dragItem>
    </template>

  </div>
</template>

<script>
import dragItem from './DragItem'

export default {
  name: 'table-item-container',
  props: {
    table: { type: Object, required: true },
    onSelectId: { type: String, default: () => '' },
    constants: { type: Object, required: true },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {
    dragItem
  },
  computed: {
    style () {
      const myHeight = this.constants.SQUARES_HEIGHT * this.table.tableMarkup.length
      return {
        height: myHeight + 'px'
      }
    }
  },
  watch: {

  },
  data () {
    return {
      hasExtendArea: false,
      extendAreaY: 0,
      extendAreaH: 0,
    }
  },
  created () {
    this.renderExtendArea()
  },
  methods: {
    onSelect (id) {
      this.$emit('on-select', id)
    },
    renderExtendArea () {
      if (this.table.info.id === null) {
        this.hasExtendArea = false
        return
      }
      const SQUARES_HEIGHT = this.constants.SQUARES_HEIGHT
      const maxLine = this.table.tableMarkup.length
      const startIndex = this.table.tableMarkup.findIndex((line) => line.extend === true)
      // 0以外の場合、拡張がある(extend === true)
      if (startIndex > -1) {
        this.hasExtendArea = true
        // 拡張エリアの高さ = line数 * マス高さ
        const lineVule = maxLine - startIndex
        this.extendAreaY = startIndex * SQUARES_HEIGHT
        this.extendAreaH = lineVule * SQUARES_HEIGHT
      } else {
        this.hasExtendArea = false
      }
      // console.log(this.table.tableMarkup)
    },
    clickTable (e) {
      const SQUARES_WIDTH = this.constants.SQUARES_WIDTH
      const offsetX = e.offsetX
      const start = Math.floor(offsetX / SQUARES_WIDTH)
      const tableId = this.table.info.id
      this.$emit('create-rsv', {
        start,
        tableId
      })
    },
    onChangeDragItem (order) {
      this.$emit('on-change-drag-item', order)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-item-container {
  width: 100%;
  z-index: 9999;
  position: relative;
}

.extend-area {
  position: absolute;
  width: 100%;
  background-image: url('/static/images/extend-bg.gif');
}
</style>
