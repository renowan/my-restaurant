<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">

    <page-tab v-model="currentTab"></page-tab>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <productPanel></productPanel>
        </div>
      </div>
    </div>

  </content-wrapper>
</template>

<script>
// import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'
import modal from '@/components/ui/Modal'
import pageTab from './components/PageTab.vue'
import productPanel from './components/ProductPanel.vue'

export default {
  name: 'menu-view',
  components: {
    contentWrapper,
    modal,
    pageTab,
    productPanel
  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'メニュー', link: null }
      ],
      currentTab: 0
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.bg-white {
  background-color: #fff;
}
</style>
