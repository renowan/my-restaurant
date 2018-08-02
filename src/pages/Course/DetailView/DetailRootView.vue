<template>
  <router-view v-if="data"></router-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'course-detail-root-view',
  computed: Object.assign({},
    mapGetters({
      data: 'course/data',
    }),
    {
    }
  ),
  watch: {

  },
  data () {
    return {
    }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('course/getCourseDetail', id)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
