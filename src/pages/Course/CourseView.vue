<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">

    <router-view></router-view>

    <div slot="topBarRight">
      <!-- <button type="button" class="btn btn-default btn-sm">
        testbtn
      </button> -->
    </div>
  </content-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import contentWrapper from '@/components/Layout/ContentWrapper'
import modal from '@/components/ui/Modal'
// import numberInput from './NumberInput'

export default {
  name: 'course-view',
  components: {
    contentWrapper,
    modal,
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
    }),
    {

    }
  ),
  data () {
    return {
      breadcrumb: [
        { label: 'Home', link: '/' },
        { label: 'サイト説明', link: null }
      ],
      myTime: 7,
      myUseTime: 7,
      showModal: false
    }
  },
  created () {
    if (!this.app.isLogin) {
      // this.$router.push('/login')
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
