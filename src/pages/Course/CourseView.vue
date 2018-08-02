<template>
  <content-wrapper :breadcrumb="breadcrumb" sectionClass="pn">

    <router-view v-if="course.isLoaded"></router-view>

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
    {}
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
  watch: {
    '$route.name' (val) {
      this.setBreadcrumb()
    }
  },
  created () {
    if (!this.app.isLogin) {
      this.$router.push('/login')
    } else {
      // const routeName = this.$route.name
      this.$store.dispatch('course/loadCourseAssets')
      this.setBreadcrumb()
    }
  },
  methods: {
    setBreadcrumb () {
      const routeName = this.$route.name
      const courseId = this.$route.params.id
      switch (routeName) {
        case 'course':
          this.breadcrumb = [
            { label: 'Home', link: '/' },
            { label: 'コース一覧', link: null }
          ]
          break
        case 'course-detail':
          this.breadcrumb = [
            { label: 'Home', link: '/' },
            { label: 'コース一覧', link: '/course' },
            { label: 'コース詳細', link: null }
          ]
          break
        case 'course-edit':
          this.breadcrumb = [
            { label: 'Home', link: '/' },
            { label: 'コース一覧', link: '/course' },
            { label: 'コース詳細', link: `/course/${courseId}` },
            { label: 'コース編集', link: null }
          ]
          break
        case 'course-create':
          this.breadcrumb = [
            { label: 'Home', link: '/' },
            { label: 'コース一覧', link: '/course' },
            { label: 'コース作成', link: null }
          ]
          break
        default:
          this.breadcrumb = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
