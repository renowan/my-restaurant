import Vue from 'vue'
import Router from 'vue-router'
// import StartView from '@/pages/Start/StartView'
import homeView from '@/pages/Home/HomeView'
import tableView from '@/pages/Table/TableView'

import courseView from '@/pages/Course/CourseView'
import courseListView from '@/pages/Course/ListView/ListView'
import courseDetailView from '@/pages/Course/DetailView/DetailView'
import courseEditView from '@/pages/Course/EditView/EditView'

import loginView from '@/pages/Login/LoginView'
import rsvView from '@/pages/Rsv/RsvView'
import calendarView from '@/pages/Calendar/CalendarView'
import sumallyView from '@/pages/Sumally/SumallyView'
import menuView from '@/pages/Menu/MenuView'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'home',
      component: homeView
    },
    {
      path: '/menu',
      name: 'menu',
      component: menuView
    },
    {
      path: '/sumally',
      name: 'sumally',
      component: sumallyView
    },
    {
      path: '/table',
      name: 'table',
      component: tableView
    },
    {
      path: '/course',
      // name: 'course',
      component: courseView,
      children: [
        {
          path: '',
          name: 'course',
          component: courseListView
        },
        {
          path: 'detail/:id',
          name: 'course-detail',
          component: courseDetailView
        },
        {
          path: 'create',
          name: 'course-create',
          component: courseEditView
        },
        {
          path: 'edit/:id',
          name: 'course-edit',
          component: courseEditView
        }
      ]
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
