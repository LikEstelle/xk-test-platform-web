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
    path: '/testflow/measure',
    component: Layout,
    redirect: '/testflow/measure/versioniteration',
    name: 'Measure',
    meta: { title: '质量度量', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'versioniteration',
        name: 'VersionIteration',
        component: () => import('@/views/testflow/measure/versioniteration/index'),
        meta: { title: '版本迭代', icon: 'el-icon-date' }
      },
      {
        path: 'qualityreview',
        name: 'QualityReview',
        component: () => import('@/views/testflow/measure/qualityreview/index'),
        meta: { title: '质量复盘', icon: 'el-icon-c-scale-to-original' }
      },
      {
        path:'workorderanalysis',
        name:'WorkOrderAnalysis',
        component:()=>import('@/views/testflow/measure/workorderanalysis/index'),
        meta:{title:'工单分析',icon:'el-icon-data-line'}
      }
    ]
  },
  {
    path: '/testflow/guard',
    component: Layout,
    redirect: '/testflow/guard/monitoring',
    name: 'Guard',
    meta: { title: '质量哨兵', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'monitoring',
        name: 'Monitoring',
        component: () => import('@/views/testflow/guard/monitoring/index'),
        meta: { title: '异常监控', icon: 'el-icon-monitor' }
      },
      {
        path: 'lnspection',
        name: 'Lnspection',
        component: () => import('@/views/testflow/guard/lnspection/index'),
        meta: { title: '生产巡检', icon: 'el-icon-view' }
      },
      {
        path: 'weburl',
        name: 'WebUrl',
        component: () => import('@/views/testflow/guard/weburl/index'),
        meta: { title: 'web响应时间', icon: 'el-icon-pie-chart' }
      },
    ]
  },
  {
    path: '/testflow/tools',
    component: Layout,
    redirect: '/testflow/tools/datatest',
    name: 'Testflow',
    meta: { title: '质量工具', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'datatest',
        name: 'DataTest',
        component: () => import('@/views/testflow/tools/datatest/index'),
        meta: { title: '数据对比', icon: 'el-icon-data-analysis' }
      },
      {
        path: 'factory',
        name: 'Factory',
        component: () => import('@/views/testflow/tools/factory/index'),
        meta: { title: '数据工厂', icon: 'el-icon-office-building' }
      },
      {
        path: 'clueconstruct',
        name: 'CluesConstruct',
        component: () => import('@/views/testflow/tools/cluesconstrcut/index'),
        meta: { title: '线索构造', icon: 'el-icon-folder-add' }

      },
      {
        path: 'upload',
        name: 'UPload',
        component: () => import('@/views/testflow/tools/upload/index'),
        meta: { title: '接口采集', icon: 'el-icon-upload2' }

      }
    ]
  },
  {
    path: '/testflow/check',
    component: Layout,
    redirect: '/testflow/check/interface',
    name: 'Check',
    meta: { title: '质量检测', icon: 'el-icon-s-finance' },
    children: [
      {
        path: 'interface',
        name: 'Interface',
        component: () => import('@/views/testflow/check/interface/index'),
        meta: { title: '接口自动化', icon: 'el-icon-news' }
      },
      {
        path: 'ui',
        name: 'Ui',
        component: () => import('@/views/testflow/check/ui/index'),
        meta: { title: 'UI自动化', icon: 'el-icon-guide' }
      },
      {
        path: 'caseEntry',
        name: 'CaseEntry',
        component: () => import('@/views/testflow/check/caseEntry/index'),
        meta: { title:'用例录入', icon: 'el-icon-thumb' }
      },
    ]
  },
  {
    path: '/testflow/manage',
    component: Layout,
    redirect: '/testflow/manage/scheduling',
    name: 'Manage',
    meta: { title: '质量管理', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'scheduling',
        name: 'Scheduling',
        component: () => import('@/views/testflow/manage/scheduling/index'),
        meta: { title: '排期报表', icon: 'el-icon-stopwatch' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/testflow/manage/file/index'),
        meta: { title: '质量文档', icon: 'el-icon-document' }
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
