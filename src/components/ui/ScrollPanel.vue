<template>
  <div class="panel">
    <div class="panel-heading">
      <span class="panel-title">{{title}}</span>
    </div>
    <slot name="panel-menu" v-if="hasPanelMenu">
      <div class="panel-menu"></div>
    </slot>
    <div :class="bodyClass">
      <ScrollBar :offsetHeight="offsetHeight" :scrollHeight="scrollHeight" :scrollTop="scrollTop" v-if="hasScroll">
      </ScrollBar>
      <div :class="{ 'scroller-content': true, 'no-scroll': !hasScroll }" @scroll="domScroll" ref="content">
        <slot></slot>
      </div>

    </div>
  </div>
</template>
<script>
import ScrollBar from './ScrollBar'

export default {
  name: 'scroll-panel',
  components: {
    ScrollBar
  },
  props: {
    title: { type: String, default: 'title' },
    size: { type: String, default: 'xs' },
    color: { type: String, default: '' },
    pn: { type: Boolean, default: true }
  },
  computed: {
    bodyClass () {
      const arr = ['panel-body', 'panel-scroller']
      arr.push(`scroller-${this.size}`)
      if (this.color !== '') {
        arr.push(`scroller-${this.color}`)
      }
      if (this.pn) {
        arr.push('scroller-pn')
        arr.push('pn')
      }
      arr.push('scroller')
      arr.push('scroller-active')
      return arr
    },
    hasScroll () {
      return this.scrollHeight > this.offsetHeight
    }
  },
  data () {
    return {
      // 見えてる部分の高さ
      offsetHeight: 0,
      // コンテンツ全体の高さ
      scrollHeight: 0,
      // バーの位置
      scrollTop: 0,
      // 縮小率
      ratio: 0,
      hasPanelMenu: false
    }
  },
  created () {
    if (this.$slots['panel-menu']) {
      this.hasPanelMenu = true
    }
  },
  mounted () {
    // do something after mounting vue instance
    // console.log('content',this.$refs.content)
    // 見えてる部分の高さ
    // console.log('offsetHeight',this.$refs.content.offsetHeight)
    // scrollHeight コンテンツ全体の高さ
    // console.log('scrollHeight',this.$refs.content.scrollHeight)
    this.scrollHeight = this.$refs.content.scrollHeight
    this.offsetHeight = this.$refs.content.offsetHeight
    this.ratio = this.offsetHeight / this.scrollHeight
  },
  methods: {
    domScroll (e) {
      this.scrollTop = e.target.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.no-scroll {
  overflow-y: hidden;
}
</style>
