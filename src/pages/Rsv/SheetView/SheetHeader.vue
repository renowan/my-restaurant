<template>
  <div>
    <div class="header-body">
      <div class="time-scale-container">
        <div class="time-scale clearfix" :style="myStyle">
          <div class="time-scale-corner"></div>
          <div class="time-scale-cell" v-for="(t, index) in time" :key="'time-' + index">{{t}}</div>
        </div>
      </div>
      <div class="corner">時間軸</div>
    </div>
    <div class="header-under"></div>
  </div>
</template>

<script>
export default {
  name: 'sheet-header',
  props: {
    posi: { type: Object, required: true }
  },
  components: {

  },
  computed: {
    myStyle () {
      return {
        left: this.posi.scrollLeft * -1 + 'px'
      }
    }
  },
  watch: {

  },
  data () {
    return {
      time: []
    }
  },
  created () {
    const time = []
    for (var i = 0; i < 29; i++) {
      time.push((i + 6) + ':00')
    }
    this.time = time
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.header-body {
  width: 100%;
  height: 28px;
  border: 1px solid #ddd;
  position: relative;
  // padding-bottom: 2px;
  // background-color: #fff;

  .corner {
    width: 120px;
    height: 26px;
    background-color: #eee;
    position: absolute;
    top: 0;
    left: 0;
    border-right: 1px solid #ddd;
    padding: 6px 8px 0;
    font-weight: 700;
    font-size: 11px;
  }
}

.time-scale-container {
  width: 100%;
  height: 26px;
  // background-color: #fff;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;

  .time-scale-corner {
    width: 121px;
    height: 26px;
    float: left;
    background-color: #eee;
  }

  .time-scale {
    width: 3001px;
    position: absolute;
  }

  .time-scale-cell {
    width: 120px;
    height: 26px;
    float: left;
    border-right: 1px solid #ddd;
    padding: 6px 8px 0;
    background-color: #eee;
  }
}

.header-under {
  width: 100%;
  height: 2px;
  background-color: #fff;
  // border-bottom: 1px solid #ddd;
}
</style>
