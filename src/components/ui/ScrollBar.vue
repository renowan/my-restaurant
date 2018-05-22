<template>
  <div class="scroller-bar" :style="{height: offsetHeight + 'px'}">
    <div class="scroller-track" :style="trackStyle">
      <div class="scroller-handle" :style="handleStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scroll-bar',
  props: {
    offsetHeight: { type: Number, default: 0 },
    scrollHeight: { type: Number, default: 0 },
    scrollTop: { type: Number, default: 0 }
  },
  computed: {
    trackStyle () {
      // height: 114px; margin-bottom: 5px; margin-top: 5px;
      return {
        height: `${this.trackHeight}px`,
        'margin-bottom': '5px',
        'margin-top': '5px'
      }
    },
    handleStyle () {
      // height: 27.8287px; top: 0px;
      return {
        height: `${this.handleHeight}px`,
        top: `${this.handlTop}px`
      }
    },
    // 縮小率
    ratio () {
      // 上下マージが5なので、10を引く
      return (this.offsetHeight - 10) / this.scrollHeight
    },
    trackHeight () {
      return this.offsetHeight - 10
    },
    handlTop () {
      return this.scrollTop * this.ratio
    },
    handleHeight () {
      return (this.offsetHeight) * this.ratio
    }
  },
  watch: {
    // scrollTop (val) {
    //   this.renderBar()
    // },
    // scrollHeight (val) {
    //   this.renderBar()
    // },
    // offsetHeight (val) {
    //   this.renderBar()
    // }
  },
  created () {
    // console.log('this.offsetHeight', this.offsetHeight)
    // console.log('this.scrollHeight', this.scrollHeight)
    // this.ratio = this.offsetHeight / this.scrollHeight
    // console.log('this.ratio', this.ratio)
  },
  data () {
    return {
      // myScrollTop: 0
    }
  },
  methods: {
    renderBar () {
      // this.ratio = this.offsetHeight / this.scrollHeight
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
