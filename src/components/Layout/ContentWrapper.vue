<template>
  <section id="content_wrapper">
    <globalTopBar :breadcrumb="breadcrumb" v-if="showTopBar">
      <slot name="topBarRight"></slot>
    </globalTopBar>
    <section id="content" :class="contentClass">
      <slot></slot>
    </section>
  </section>
</template>

<script>
import globalTopBar from '@/components/Layout/GlobalTopBar.vue'

export default {
  name: 'content-wrapper',
  props: {
    breadcrumb: { type: Array, default: () => [] },
    isTableLayout: { type: Boolean, default: () => false },
    sectionClass: { type: String, default: () => '' }
  },
  components: {
    globalTopBar
  },
  computed: {
    showTopBar () {
      return this.breadcrumb.length > 0
    },
    contentClass () {
      const base = ['animated', 'fadeIn']
      base.push(this.sectionClass)
      return base
    }
  },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
</style>
