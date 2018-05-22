<template lang="html">
  <header id="topbar">
    <div class="topbar-left">
      <ol class="breadcrumb">

        <li
        v-for="(item, index) in breadcrumb"
        :class="getClass(item, index)"
        v-if="hasBreadcrumb"
        :key="'top-bar-' + index">
          <template v-if="index === 0">
            <router-link :to="item.link">{{item.label}}</router-link>
          </template>
          <template v-else-if="item.link === null">
            {{item.label}}
          </template>
          <template v-else>
            <router-link :to="item.link">{{item.label}}</router-link>
          </template>
        </li>

      </ol>
    </div>
    <div class="topbar-right">

      <div class="ml15 ib va-m">

        <slot></slot>

      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'global-header',
  props: {
    breadcrumb: { type: Array, default: () => [] }
  },
  computed: Object.assign(
    mapGetters({
      app: 'app/state'
    }),
    {
      hasBreadcrumb () {
        return this.breadcrumb.length > 0
      }
    }
  ),
  methods: {
    getClass (item, index) {
      if (index === 0) {
        return 'crumb-active'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#topbar {
  padding: 10px 24px;
}
</style>
