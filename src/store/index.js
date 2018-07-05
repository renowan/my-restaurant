import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import home from './modules/home'
import table from './modules/table'
import course from './modules/course'
import rsv from './modules/rsv'
import cal from './modules/cal'
import sumally from './modules/sumally'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    home,
    table,
    course,
    rsv,
    cal,
    sumally,
    menu
  },
  strict: true,
  plugins: []
})
