<template>
  <div class="up-loader" :class="{ active: isActive }">
    <i class="fa fa-cloud-upload"></i>
  </div>
</template>

<script>
export default {
  name: 'image-box',
  components: {

  },
  computed: {
    isActive () {
      return false
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
.up-loader {
  border: 1px dashed #ccc;
  background-color: #eee;
  width: 100%;
  height: 110px;

  font-size: 34px;
  text-align: center;
  color: #bbb;
  .fa {
    margin-top: 38px;
  }

  &.active {
    border-color: #4a89dc;
  }
}
</style>
