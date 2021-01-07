import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'

// Page Import
import TargetPick from '@/components/pages/TargetPick'
import TargetReport from '@/components/pages/TargetReport'
import CreativeLibrary from '@/components/pages/CreativeLibrary'
import SetReport from '@/components/pages/SetReport'
import AccountReport from '@/components/pages/AccountReport'
import Setting from '@/components/pages/Setting'
import NewTagetPick from '@/components/pages/NewTagetPick'
import libraryInsight from '@/components/pages/libraryInsight'
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/pick',
      beforeEnter: requireAuth,
      name: 'TargetPick',
      component: TargetPick
    },
    {
      path: '/setreport',
      beforeEnter: requireAuth,
      name: 'SetReport',
      component: SetReport,
    },
    {
      path: '/accountreport',
      name: 'AccountReport',
      beforeEnter: requireAuth,
      component: AccountReport
    },
    // {
    //   path: '/report',
    //   beforeEnter: requireAuth,
    //   name: 'TargetReport',
    //   component: TargetReport,
    //   children: [
    //     {
    //       path: 'setreport',
    //       name: 'SetReport',
    //       component: SetReport
    //     },
    //     {
    //       path: 'accountreport',
    //       name: 'AccountReport',
    //       component: AccountReport
    //     }
    //   ]
    // },
    {
      path: '/library',
      beforeEnter: requireAuth,
      name: 'CreativeLibrary',
      component: CreativeLibrary
    },
    {
      path: '/setting',
      beforeEnter: requireAuth,
      name: 'Setting',
      component: Setting
    },
    {
      path: '/newpick',
      beforeEnter: requireAuth,
      name: 'NewTagetPick',
      component: NewTagetPick
    },
    {
      path: '/insight',
      beforeEnter: requireAuth,
      name: 'libraryInsight',
      component: libraryInsight
    }
  ]
})
