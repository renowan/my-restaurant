<template>
  <div class="container-fluid pb24 mh8">
    <div class="row mb16">
      <div class="col-xs-8">
        <h3 class="mt24">コース一覧</h3>
      </div>
      <div class="col-xs-4 text-right">
        <button type="button" class="btn btn-default mt16" @click="goCreateCourse">
          新規コース
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <productPanel v-for="(item, index) in list" :key="index" :item="item" :taxRate="app.taxRate"></productPanel>
      </div>
      <div class="col-xs-12" v-if="noCourse">
        コースがない
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import productPanel from './components/ProductPanel'

export default {
  name: 'list-view',
  components: {
    productPanel
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      course: 'course/state',
      list: 'course/list',
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

    }
  },
  created () {
    // this.$store.dispatch('course/getCourse')
  },
  methods: {
    goCreateCourse () {
      this.$router.push({ name: 'course-create' })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {

  }
}
</style>
