<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="">

    <router-view></router-view>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          s
        </div>
      </div>
    </div>
  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'

export default {
  name: 'rsv2-view',
  components: {
    contentWrapper
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app',
    }),
    {}
  ),
  watch: {

  },
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'サイト説明', link: null }
      ]
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
