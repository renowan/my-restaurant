<template>
  <div class="time-line-grid" :style="{height: innerHeight + 'px'}">
    <div
    v-for="(v, index) in varr"
    :class="myClass(index)"
    :style="myStyle(v)"
    :key="'v-' + index">
    </div>

    <div v-for="(h, hIndex) in trList"
    class="h-slats"
    :class="h.class"
    :style="myHStyle(h)"
    :key="'h-' + hIndex">
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-line-grid',
  props: {
    tableMap: { type: Array, required: true },
    innerHeight: { type: Number, default: () => 0 }
  },
  components: {
  },
  computed: {
  },
  watch: {
    tableMap () {
      this.createTrList()
    }
  },
  data () {
    return {
      varr: [],
      trList: []
    }
  },
  created () {
    const varr = []
    for (var i = 1; i < 96; i++) {
      varr.push(i * 30)
    }
    this.varr = varr

    this.createTrList()
  },
  methods: {
    createTrList () {
      const trList = []
      let top = 0
      this.tableMap.forEach((table, tableIndex) => {
        table.tableMarkup.forEach((line, index) => {
          const obj = {
            top,
            class: index !== 0 ? '' : 'solid-line'
          }
          trList.push(obj)
          top += 30
        })
      })
      trList.push({
        top,
        class: 'solid-line'
      })
      this.trList = trList
    },
    myClass (v) {
      return v % 4 === 3 ? 'v-slats solid-line' : 'v-slats'
    },
    myStyle (v) {
      return {
        'transform': `translate(${v}px, 0px)`
      }
    },
    myHStyle (h) {
      return {
        'transform': `translate(0px, ${h.top}px)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line-grid {
  width: 2880px;
  // min-height: 200px;
  height: 100%;
  position: absolute;
  // left: 120px;
  z-index: 910;
}

.v-slats {
  height: 100%;
  width: 1px;
  position: absolute;
  border-right: 1px dotted #ececec;
  &.solid-line {
    border-right: 1px solid #ddd;
  }
}

.h-slats {
  width: 100%;
  height: 1px;
  position: absolute;
  border-bottom: 1px dotted #ececec;
  &.solid-line {
    border-bottom: 1px solid #ddd;
  }
}
</style>
