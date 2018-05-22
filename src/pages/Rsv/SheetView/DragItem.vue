<template>
  <div class="drag-itme" :class="myClass" :style="myStyle" @mousedown.stop="elmDown">
    <div class="drag-item-inner">
      <div class="item-bg">
        <div class="item-select" v-if="isOnSelect"></div>
      </div>
    </div>
    <div class="drag-item-inner txt-wapper">
      <div class="item-txt">
        <div class="txt-ellipsis" :style="{width: width + 'px'}" v-if="isLoading">
          Saving...
        </div>
        <div class="txt-ellipsis" :style="{width: width + 'px'}" v-else>
          <i class="fa" :class="icon"></i> {{rsv.name}}
        </div>
      </div>
    </div>
    <div class="drap-start-point-handler" @mousedown="handleDown('start', $event)"></div>
    <div class="drap-end-point-handler" @mousedown="handleDown('end', $event)"></div>
  </div>
</template>

<script>
export default {
  name: 'drag-itme',
  props: {
    rsv: { type: Object, required: true },
    constants: { type: Object, required: true },
    index: { type: Number, default: () => 0 },
    nowPoint: { type: Number, default: () => 0 },
    onSelectId: { type: String, default: '' },
    uiLoadingList: { type: Array, default: () => [] }
  },
  components: {

  },
  computed: {
    myStyle () {
      const SQUARES_HEIGHT = this.constants.SQUARES_HEIGHT
      const myTop = SQUARES_HEIGHT * this.index
      // const myX = this.start * SQUARES_WIDTH
      const myHeight = this.tableFrame * SQUARES_HEIGHT
      return {
        top: myTop + 'px',
        left: this.x + 'px',
        width: this.width + 'px',
        height: myHeight + 'px'
      }
    },
    myClass () {
      const arr = ['state-' + this.rsv.state]
      // const stateClass = 'state-' + this.rsv.state
      const isPast = false
      if (isPast) arr.push('past')
      if (this.isOnSelect) arr.push('on-select')
      return arr
    },
    isOnSelect () {
      return this.onSelectId === this.rsv.id
    },
    isLoading () {
      return this.uiLoadingList.indexOf(this.rsv.id) > -1
    },
    icon () {
      let icon = ''
      switch (this.rsv.state) {
        case 0:
          icon = 'fa-question-circle'
          break
        case 1:
          icon = 'fa-check-square-o'
          break
        case 2:
          icon = 'fa-thumbs-o-up'
          break
        case 3:
          icon = 'fa-times-circle'
          break
        default:
          icon = 'fa-question-circle'
      }
      return icon
    }
  },
  watch: {
    rsv () {
      this.update()
    }
  },
  data () {
    return {
      // 直前の状態を記録する変数
      lastX: 0,
      lastWidth: 30,
      lastMouseX: 0,

      // 現在の状態
      handle: 'start',
      dragging: false,
      resizing: false,
      draggable: true,

      x: 0,
      width: 35,
      mouseX: 0,
      mouseY: 0,
      minWidth: 30,
      maxWidth: 2880,
      start: 0,
      end: 0,
      long: 0,
      tableFrame: 0,

      // ドラッグできる範囲
      startLimitX: 0,
      endLimitX: 0,

      disabled: false,

      gridX: 0
    }
  },
  created () {
    this.gridX = this.constants.SQUARES_WIDTH
    this.update()
  },
  mounted () {
    document.documentElement.addEventListener('mousemove', this.handleMove, true)
    document.documentElement.addEventListener('mousedown', this.deselect, true)
    document.documentElement.addEventListener('mouseup', this.handleUp, true)
  },
  beforeDestroy () {
    document.documentElement.removeEventListener('mousemove', this.handleMove, true)
    document.documentElement.removeEventListener('mousedown', this.deselect, true)
    document.documentElement.removeEventListener('mouseup', this.handleUp, true)
  },
  methods: {
    update () {
      this.start = this.rsv.start
      this.long = this.rsv.long
      this.tableFrame = this.rsv.tableFrame

      this.x = this.start * this.gridX
      this.width = this.long * this.gridX
    },
    handleDown (handle, e) {
      if (this.disabled) return
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.resizing = true
      this.$emit('on-select', this.rsv.id)
    },
    elmDown (e) {
      if (this.disabled) return

      if (this.draggable) {
        this.dragging = true
        this.$emit('on-select', this.rsv.id)
      }
    },
    handleMove (e) {
      if (this.disabled) return

      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      const diffX = this.mouseX - this.lastMouseX

      if (this.resizing) {
        // リサイズ
        if (this.handle === 'end') {
          // end
          const newWidth = this.roundX(this.lastWidth + diffX)
          // const newEndX = this.x + newWidth
          if (newWidth >= this.minWidth && newWidth <= this.maxWidth) {
            this.width = newWidth
          }
        } else {
          // start
          const newX = this.roundX(this.lastX + diffX)
          const newWidth = this.roundX(this.lastWidth - diffX)
          if (newX >= 0 && newWidth >= this.minWidth) {
            this.x = newX
            this.width = newWidth
          }
        }
      } else if (this.dragging) {
        // dragging
        const newX = this.roundX(this.lastX + diffX)
        // const newEndX = newX + this.width
        if (newX >= 0 && newX <= this.maxWidth) {
          this.x = newX
        }
      }

      this.start = this.x / this.gridX
    },
    handleUp (e) {
      const SQUARES_WIDTH = this.constants.SQUARES_WIDTH
      const isSameX = this.x === this.lastX
      const isSameWidth = this.width === this.lastWidth

      if (isSameX && isSameWidth) {
        this.resizing = false
        this.dragging = false
        return
      }

      const newSize = {
        id: this.rsv.id,
        start: this.x / SQUARES_WIDTH,
        long: this.width / SQUARES_WIDTH
      }
      if (this.resizing) {
        this.resizing = false
        this.$emit('on-change-drag-item', newSize)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('on-change-drag-item', newSize)
      }
    },
    deselect (e) {
      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollLeft
      this.lastMouseX = this.mouseX
      this.lastWidth = this.width
      this.lastX = this.x
    },
    roundX (num) {
      const gridX = this.gridX
      return (Math.round(num / gridX) * gridX)
    },
  }
}
</script>

<style lang="scss" scoped>
.drag-itme {
  position: absolute;
  min-height: 30px;
}

.drag-item-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 4px 3px 3px 4px;
}

.item-bg, .item-select  {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  box-sizing: border-box;
}

.txt-wapper {
  display: table;
  .item-txt {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    font-size: 10px;
  }
  .txt-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 6px;
    user-select: none;
  }
}

.drap-start-point-handler, .drap-end-point-handler {
  height: 100%;
  width: 15px;
  position: absolute;
  cursor: ew-resize;
  // background-color: rgba(249, 255, 0, 0.63);
}

.drap-end-point-handler {
  right: 0;
}

.state-0 {
  color: #826837;
  // color: #fff;
  .item-bg {
    background-color: #F0CA77;
  }
  .item-select {
    border: 1px solid #C7A054;
  }
}

.item-txt {
  color: #fff;
  font-weight: bold;
  .fa {
    font-weight: normal;
  }
}

.state-1 {
  // color: #44673d;
  .item-bg {
    background-color: #9DD288;
  }
  .item-select {
    border: 1px solid #6FA766;
  }
}
.state-2 {
  // color: #466573;
  .item-bg {
    background-color: #3BAFDA;
  }
  .item-select {
    border: 1px solid #5B90A9;
  }
}

.state-3 {
  .item-bg {
    background-color: #BFBFBF;
  }
  .item-select {
    border: 1px solid #929292;
  }
}

.past {
  color: #bfa87c;
  .item-bg {
    background-color: #E4D3AF;
  }
  .item-select {
    border: 1px solid #AFA184;
  }
}
.past.state-1 {
  color: #8fa98a;
  .item-bg {
    background-color: #C1CDBD;
  }
  .item-select {
    border: 1px solid #9EAB9A;
  }
}
.past.state-2 {
  color: #E8F2F6;
  .item-bg {
    background-color: #ACCBD7;
  }
  .item-select {
    border: 1px solid #8298A1;
  }
}

.past.state-3 {
  color: #b9b9b9;
  .item-bg {
    background-color: #E3E3E3;
  }
  .item-select {
    border: 1px solid #C3C3C3;
  }
}

.on-select {
  z-index: 9999;
}
</style>
