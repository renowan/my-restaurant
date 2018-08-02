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
    {}
  ),
  created () {
    // this.$store.commit('app/SET_IS_DEBUG')
    if (this.app.isDebug) {
      console.log('debug')
    } else {
      // loadingを出しておく
      this.$store.commit('app/UPDATE_ISLOADING', true)

      // ログイン状態が変更されたとき
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // ログイン状態
          this.$store.dispatch('app/getHasUserData', user.uid).then((result) => {
            if (result) {
              // すでにログインしている場合はここまで
              if (this.app.isOnLoginProcessing) return
              // ユーザー存在
              this.$store.dispatch('app/autoLogin', user)
            } else {
              // ユーザー存在しない、データを作成へ
              this.$store.dispatch('app/createUser', user)
              this.$router.push('/home')
            }
          })
        } else {
          // ログアウト状態
          this.$store.commit('app/UPDATE_ISLOADING', false)
          this.$store.commit('app/UPDATE_IS_APP_LOADED', true)
          this.$router.push('/login')
        }
      })
    }
  },
  components: { App },
  template: '<App/>'
})
