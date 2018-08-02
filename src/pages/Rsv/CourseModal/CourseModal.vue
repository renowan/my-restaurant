<template>
  <modal v-model="showMyModal" title="コース詳細" @cancel="cancelAction">

    <div v-if="course">
      <itemGroupTable
      v-for="(group, index) in course.itemGroup"
      :key="index" :group="group"
      :productObj="productObj">
      </itemGroupTable>
    </div>

    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="cancelAction">閉じる</button>
    </div>

  </modal>
</template>

<script>
import modal from '@/components/ui/Modal'
import itemGroupTable from '@/components/ui/ItemGroupTable/'

export default {
  name: 'CourseModal',
  props: {
    showModal: { type: Boolean, default: () => false },
    courseList: { type: Array, default: () => [] },
    productObj: { type: Object, default: () => {} },
    courseId: { type: String, default: () => '' }
  },
  components: {
    modal,
    itemGroupTable
  },
  computed: {

  },
  watch: {
    showModal (val) {
      this.showMyModal = val
      if (val) {
        this.init()
      } else {
        this.resetData()
      }
    }
  },
  data () {
    return {
      showMyModal: false,
      course: null
    }
  },
  created () {

  },
  methods: {
    init () {
      console.log('init', this.courseId)
      console.log(this.courseList.find((course) => course.id === this.courseId))
      this.course = this.courseList.find((course) => course.id === this.courseId)
    },
    cancelAction () {
      this.$emit('close-create-modal')
    },
    resetData () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
