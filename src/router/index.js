import Vue from 'vue'
import Router from 'vue-router'
// import StartView from '@/pages/Start/StartView'
import homeView from '@/pages/Home/HomeView'
import tableView from '@/pages/Table/TableView'
import loginView from '@/pages/Login/LoginView'
import rsvView from '@/pages/Rsv/RsvView'
import calendarView from '@/pages/Calendar/CalendarView'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'home',
      component: homeView
    },
    {
      path: '/table',
      name: 'table',
      component: tableView
    },
    {
      path: '/rsv/:date',
      name: 'rsv',
      component: rsvView
    },
    {
      path: '/cal/:yearMonth',
      name: 'cal',
      component: calendarView
    },
    {
      path: '/login',
      name: 'login',
      component: loginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
