<template>
  <div class="container-fluid pb24 mh8">
    <div class="row mb16">
      <div class="col-xs-8">
        <h3 class="mt24">コース一覧</h3>
      </div>
      <div class="col-xs-4 text-right">
        <button type="button" class="btn btn-default mt16" @click="createCourse">
          新規コース
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <productPanel></productPanel>
      </div>
      <div class="col-xs-12" v-if="noCourse">
        コースがない
      </div>
      <div class="col-xs-12" v-else>
        <ul>
          <li v-for="(item, index) in list" :key="index">item.name</li>
        </ul>
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
    console.log('list created', this.$route)
    this.$store.dispatch('course/getCourse')
  },
  methods: {
    createCourse () {
      this.$store.dispatch('course/createCourse')
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
