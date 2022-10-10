import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/measure',
    component: Layout,
    redirect: '/measure/versioniteration',
    name:'Measure',
    meta: { title: '质量度量', icon: 'el-icon-s-help' },
    children: [
      {
      path: 'versioniteration',
      name: 'VersionIteration',
      component: () => import('@/views/measure/versioniteration/index'),
      meta: { title: '版本迭代', icon: 'home' }
      },
      {
        path: 'qualityreview',
        name: 'QualityReview',
        component: () => import('@/views/measure/qualityreview/index'),
        meta: { title: '质量复盘', icon: 'home' }
      },
    ]
  },
  {
    path: '/guard',
    component: Layout,
    redirect: '/guard/monitoring',
    name:'Guard',
    meta: { title: '质量哨兵', icon: 'el-icon-s-platform' },
    children: [
      {
      path: 'monitoring',
      name: 'Monitoring',
      component: () => import('@/views/guard/monitoring/index'),
      meta: { title: '异常监控', icon: 'home' }
      },
      {
        path: 'lnspection',
        name: 'Lnspection',
        component: () => import('@/views/guard/lnspection/index'),
        meta: { title: '生产巡检', icon: 'home' }
      },
    ]
  },
  {
    path: '/testflow',
    component: Layout,
    redirect: '/testflow/testsuite',
    name:'Testflow',
    meta: { title: '质量工具', icon: 'el-icon-s-cooperation'},
    children: [
      {
      path: 'testsuite',
      name: 'Testsuite',
      component: () => import('@/views/testflow/testsuite/index'),
      meta: { title: '接口脚本', icon: 'home' }
      },
      {
        path: 'testreport',
        name: 'Testreport',
        component: () => import('@/views/testflow/testreport/index'),
        meta: { title: '接口报告', icon: 'home' }
      },
      {
        path: 'datatest',
        name: 'DataTest',
        component: () => import('@/views/testflow/datatest/index'),
        meta: { title: '数据对比', icon: 'home' }
      },
    ]
  },
  {
    path: '/check',
    component: Layout,
    redirect: '/check/interface',
    name:'Check',
    meta: { title: '质量检测', icon: 'el-icon-s-finance' },
    children: [
      {
      path: 'interface',
      name: 'Interface',
      component: () => import('@/views/check/interface/index'),
      meta: { title: '接口自动化', icon: 'home' }
      },
      {
        path: 'ui',
        name: 'Ui',
        component: () => import('@/views/check/ui/index'),
        meta: { title: 'UI自动化', icon: 'home' }
      },
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/scheduling',
    name:'Manage',
    meta: { title: '质量管理', icon: 'el-icon-s-marketing' },
    children: [
      {
      path: 'scheduling',
      name: 'Scheduling',
      component: () => import('@/views/manage/scheduling/index'),
      meta: { title: '排期报表', icon: 'home' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/manage/file/index'),
        meta: { title: '质量文档', icon: 'home' }
      },
    ]
  },
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
