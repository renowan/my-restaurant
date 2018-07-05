<template>
  <div class="container-fluid pb24 mh8">

    <div class="row">
      <div class="col-xs-12">
        <h3>コース詳細</h3>
        <p>We even included dozens of prebuilt form layouts so you can leave work early</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'course-detail-view',
  components: {

  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
      editData: 'course/editData',
    }),
    {
      noCourse () {
        return this.course.isLoaded && this.list.length < 1
      }
    }
  ),
  watch: {

  },
  data () {
    return {
      routerName: ''
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
