<template>
  <div class="table-item-container" :style="style">
    <div class="extend-area" v-if="hasExtendArea" :style="{ top: extendAreaY + 'px', height: extendAreaH + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: 'table-extend-bg',
  props: {
    table: { type: Object, required: true },
    constants: { type: Object, required: true },
  },
  components: {

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
    table () {
      console.log('テーブルからったほ')
      this.renderExtendArea()
    }
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
  // background-color: red;
}
</style>
