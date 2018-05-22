<template>
  <div :class="[{timepicker: true, disabled: disabled}]" v-click-outside="blur" :style="{'width': optionalWidth}">
    <span class="form-control" @click.prevent="toggle" :style="{'width': optionalWidth}">{{timeTxt}}</span>
    <i class="caret" @click.prevent="toggle"></i>
    <div class="timepicker-popup clearfix" v-show="show">
      <table class="table-condensed">
        <tbody>
          <tr>
            <td>
              <a href="javascript:void(0)" class="btn" data-action="incrementHours" @click="minusHour">
                <span class="glyphicon glyphicon-chevron-up"></span>
              </a>
            </td>
            <td class="separator"></td>
            <td>
              <a href="javascript:void(0)" class="btn" data-action="incrementHours" @click="minusMin">
                <span class="glyphicon glyphicon-chevron-up"></span>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <span data-action="showHours" data-time-component="hours" class="timepicker-hour">{{hh}}</span>
            </td>
            <td class="separator">:</td>
            <td>
              <span data-action="showHours" data-time-component="hours" class="timepicker-hour">{{mm}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <a href="javascript:void(0)" class="btn" data-action="incrementHours" @click="plusHour">
                <span class="glyphicon glyphicon-chevron-down"></span>
              </a>
            </td>
            <td class="separator"></td>
            <td>
              <a href="javascript:void(0)" class="btn" data-action="incrementHours" @click="plusMin">
                <span class="glyphicon glyphicon-chevron-down"></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClickOutside from './directives/ClickOutside.js'
import * as timeUtility from '@/common/utils/timeUtility'

export default {
  name: 'time-picker',
  directives: {
    ClickOutside
  },
  props: {
    disabled: { type: Boolean, default: false },
    width: { default: null },
    value: { type: Number, default: 0 },
    minValue: { type: Number, default: 0 },
    maxValue: { type: Number, default: 96 },
    justified: { type: Boolean, default: false },
  },
  data () {
    var index = this.value
    return {
      index,
      show: false,
      displayTimeView: true,
      // 内部時間計算用時間
      time: 0,
      minTime: 0,
      maxTime: 96,
    }
  },
  watch: {
    time (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.time = this.value
    },
  },
  created () {
    this.time = this.value
  },
  computed: {
    optionalWidth () {
      if (this.justified) {
        return '100%'
      }
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    },
    timeTxt () {
      return timeUtility.getTimeStrFromPoint(this.time)
    },
    hh () {
      return this.timeTxt.slice(0, 2)
    },
    mm () {
      return this.timeTxt.slice(3, 5)
    }
  },
  methods: {
    blur () {
      this.show = false
    },
    toggle () {
      if (!this.disabled) { this.show = !this.show }
    },
    minusHour () {
      const nextTime = this.time - 4
      if (nextTime >= this.minTime) {
        this.time = nextTime
      }
    },
    plusHour () {
      const nextTime = this.time + 4
      if (nextTime <= this.maxTime) {
        this.time = nextTime
      }
    },
    minusMin () {
      const nextTime = this.time - 1
      if (nextTime >= this.minTime) {
        this.time = nextTime
      }
    },
    plusMin () {
      const nextTime = this.time + 1
      if (nextTime <= this.maxTime) {
        this.time = nextTime
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.timepicker {
  position: relative;
  .caret {
    position: absolute;
    top: 18px;
    right: 10px;
    font-size: 21px;
    color: #666;
    cursor: pointer;
  }
}

.timepicker-popup {
  position: absolute;
  border: 1px solid rgba(0,0,0,.15);;
  margin-top: 2px;
  z-index: 1000;
  padding: 16px 20px;
  width: 100%;
  // right: 0;
  min-width: 152px;
  background-color: #fff;
}

.timepicker-hour {
  width: 54px;
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
}

.table-condensed {
  width: 130px;
  margin: 0 auto;
  td {
    text-align: center;
    padding: 2px 5px;
  }
  a:active {
    box-shadow: none;
    color: #4a89dc;
  }
}
</style>
