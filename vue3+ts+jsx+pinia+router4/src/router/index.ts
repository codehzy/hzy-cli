import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // 首页骨架屏
  {
    path: '/',
    name: 'hello-world',
    component: () => import('../components/index.vue')
  },
  // 视频滚动小窗显示
  {
    path: '/video',
    name: 'video',
    component: () => import('../components/video/index.vue')
  },
  {
    path: '/transtion',
    name: 'transtion',
    component: () => import('../components/transtion/index.vue')
  },
  {
    path: '/numberTransition',
    name: 'numberTransition',
    component: () => import('../components/numberTransition/index.vue')
  },
  {
    path: '/botherCommunicate',
    name: 'botherCommunicate',
    component: () => import('../components/botherCommunicate/index.vue')
  },
  {
    path: '/un-import',
    name: 'un-import',
    component: () => import('../components/un-import/index.vue')
  },
  {
    path: '/deepVModel',
    name: 'deepVModel',
    component: () => import('../components/deepVModel/index.vue')
  },
  {
    path: '/customVDirective',
    name: 'customVDirective',
    component: () => import('../components/customVDirective/index.vue')
  },
  {
    path: '/FnVDirective',
    name: 'FnVDirective',
    component: () => import('../components/FnVDirective/index.vue')
  },
  {
    path: '/vueMarkdown',
    name: 'vueMarkdown',
    component: () => import('../components/vueMarkdown/index.vue')
  },
  {
    path: '/dragComponent',
    name: 'dragComponent',
    component: () => import('../components/dragComponent/component/index.vue')
  },
  {
    path: '/globalFilter',
    name: 'globalFilter',
    component: () => import('../components/globalFilter/index.vue')
  },
  {
    path: '/pluginDialog',
    name: 'pluginDialog',
    component: () => import('../components/pluginDialog/index.vue')
  },
  {
    path: '/initElementPlus',
    name: 'initElementPlus',
    component: () => import('../components/initElementPlus/index.vue')
  },
  {
    path: '/piniaStore',
    name: 'piniaStore',
    component: () => import('../components/piniaStore/index.vue')
  },
  {
    path: '/viewEcharts',
    name: 'viewEcharts',
    component: () => import('../components/viewEcharts/index.vue')
  },
  {
    path: '/multLine',
    name: 'multLine',
    component: () => import('../components/multLine/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
