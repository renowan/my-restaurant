<template>
  <span class="label label-xs" :class="myType">{{txt}}</span>
</template>

<script>
const typeObj = {
  '0': { color: 'label-warning', txt: '未確定' },
  '1': { color: 'label-success', txt: '確定' },
  '2': { color: 'label-info', txt: '来店済' },
  '3': { color: 'label-gray', txt: 'キャンセル' },
}
export default {
  name: 'vue-name',
  props: {
    state: { type: Number, default: () => 0 }
  },
  components: {

  },
  computed: {
    myType () {
      return typeObj[String(this.state)].color
    },
    txt () {
      return typeObj[String(this.state)].txt
    }
  },
  watch: {

  },
  data () {
    return {

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
