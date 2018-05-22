<template>
  <div id="main">

    <GlobalHeader @toggle-navi="toggleNavi" :isLogin="app.isLogin" :userInfo="app.userInfo" @logout="logout"></GlobalHeader>

    <GlobalAside></GlobalAside>

    <router-view v-if="isAppLoaded"></router-view>

    <spinner ref="spinner" global v-model="app.isLoading" size="lg" fixed text="Loading..."></spinner>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GlobalHeader from '@/components/Layout/GlobalHeader'
import GlobalAside from '@/components/Layout/GlobalAside'
import GlobalTopBar from '@/components/Layout/GlobalTopBar'
import { spinner } from 'vue-strap'

export default {
  name: 'my-restaurant',
  computed: mapGetters({
    app: 'app/state',
    isAppLoaded: 'app/isAppLoaded',
  }),
  components: {
    GlobalHeader,
    GlobalAside,
    GlobalTopBar,
    spinner
  },
  data () {
    return {
      isWide: true,
      bodyClass: 'admin-wizard-page sb-l-o sb-r-c'
    }
  },
  watch: {
    isWide (val) {
      const body = document.body
      const hasSbrc = body.classList.contains('sb-r-c')
      const sbrm = 'sb-l-m'
      if (val) {
        if (hasSbrc) {
          body.classList.remove(sbrm)
        }
      } else {
        if (hasSbrc) {
          body.classList.add(sbrm)
        }
      }
    }
  },
  created () {
    window.addEventListener('resize', this.windowResize)
    this.windowResize()
    // const innerWidth = window.innerWidth
    // this.$store.commit('APP_TOGGLE_NAVI', innerWidth > 1100)
  },
  methods: {
    send () {
      console.log('send')
    },
    toggleNavi () {
      console.log('app toggleNavi')
      this.$store.commit('app/APP_TOGGLE_NAVI', !this.app.isNaviOpen)
      const body = document.body
      const sbrm = 'sb-l-m'
      if (this.app.isNaviOpen) {
        body.classList.remove(sbrm)
      } else {
        body.classList.add(sbrm)
      }
    },
    windowResize () {
      /*
      mobile-view 1080
       */
      const innerWidth = window.innerWidth
      if (innerWidth > 1100) {
        if (!this.isWide) {
          this.isWide = true
        }
      } else {
        if (this.isWide) {
          this.isWide = false
        }
      }
      // console.log('windowResize', window.innerWidth)
    },
    logout () {
      this.$store.dispatch('app/loginOut').then(() => {
        // ログアウトできた
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">

</style>
