<template>
  <div role="dialog" :class="['modal', type, effect]" @click="backClose">
    <div :class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document" :style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close" v-if="headerClose"><span>&times;</span></button>
            <h4 class="modal-title"><slot name="title">{{title}}</slot></h4>
          </div>
        </slot>
        <slot name="modal-body"><div class="modal-body"><slot></slot></div></slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="close">{{ cancelText }}</button>
            <button type="button" class="btn btn-primary" @click="ok">{{ okText }}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {getScrollBarWidth} from './utils/utils.js'

export default {
  props: {
    backdrop: {type: Boolean, default: true},
    callback: {type: Function, default: null},
    cancelText: {type: String, default: 'Close'},
    effect: {type: String, default: null},
    type: {type: String, default: null},
    large: {type: Boolean, default: false},
    okText: {type: String, default: 'Save changes'},
    small: {type: Boolean, default: false},
    title: {type: String, default: ''},
    value: {type: Boolean, required: true},
    headerClose: {type: Boolean, default: true},
    width: {default: null}
  },
  computed: {
    optionalWidth () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    }
  },
  data () {
    return {
      xoffset: 0,
      yoffset: 0,
      defaultView: null
    }
  },
  watch: {
    value (val) {
      this.transitionstart()
      if (!val) {
        this.transitionend()
      }
    }
  },
  created () {
    window.addEventListener('keydown', this.onKeyPress)
    this.defaultView = document.defaultView
  },
  methods: {
    onKeyPress (e) {
      if (!this.value || !this.backdrop) return
      if (e.key === 'Escape' || e.keyCode === 27) {
        this.close()
      }
    },
    backClose (e) {
      if (this.backdrop && e.target === this.$el) { this.close() }
    },
    close () {
      this.$emit('cancel')
      this.$emit('input', false)
    },
    ok () {
      if (this.callback instanceof Function) this.callback()
      this.$emit('ok')
    },
    transitionstart () {
      const el = this.$el
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      if (this.value) {
        el.querySelector('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => el.classList.add('in'), 0)

        if (this.defaultView) {
          const defaultView = this.defaultView
          this.xoffset = defaultView.pageXOffset
          this.yoffset = defaultView.pageYOffset
        } else {
          const documentElement = document.documentElement
          this.xoffset = documentElement.scrollLeft
          this.yoffset = documentElement.scrollTop
        }

        body.classList.add('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
      }
    },
    transitionend () {
      this.$el.style.display = 'none'
      const body = document.body
      body.style.paddingRight = null
      body.classList.remove('modal-open')
      this.$el.classList.remove('in')

      if (this.defaultView) {
        document.defaultView.scrollTo(this.xoffset, this.yoffset)
      } else {
        window.scrollTo(this.xoffset, this.yoffset)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
  height: 100%;
}
.modal.zoom .modal-dialog {
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);
  -ms-transform: scale(0.1);
  transform: scale(0.1);
  top: 300px;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transform: translate3d(0, -300px, 0);
  transform: translate3d(0, -300px, 0);
  opacity: 1;
}
.modal.alert{
  .modal-content{
    padding-bottom: 24px;
  }
  .modal-body{
    padding: 24px 22px;
  }
  .modal-footer{
    padding: 0;
  }
}
h4.modal-title {
  color: #333;
}
</style>
