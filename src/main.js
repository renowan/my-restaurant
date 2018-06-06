// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { mapGetters } from 'vuex'
import App from './components/App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const firebase = window.firebase

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  computed: Object.assign({},
    mapGetters({
      app: 'app/state'
    }),
    {
    }
  ),
  data () {
    return {
      isDebug: false
    }
  },
  watch: {
    'app.isAppLoaded' (val) {
      // this.$store.commit('app/UPDATE_ISLOADING', false)
      // const pageName = this.$route.name
      // if (pageName === 'login' || pageName === 'start') {
      //   this.$router.push('/home')
      // }
    }
  },
  created () {
    // this.$store.commit('app/SET_IS_DEBUG')
    if (this.app.isDebug) {
      console.log('debug')
    } else {
      this.$store.commit('app/UPDATE_ISLOADING', true)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          this.$store.dispatch('app/appInit', user)
          this.$store.commit('app/UPDATE_IS_LOGIN', true)
        } else {
          // No user is signed in.
          this.$store.commit('app/UPDATE_ISLOADING', false)
          this.$store.commit('app/UPDATE_IS_APP_LOADED', true)
          this.$router.push('/login')
        }
      })
    }
  },
  methods: {

  },
  components: { App },
  template: '<App/>'
})
