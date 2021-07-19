/*
 * @Author: fan
 * @Date: 2021-06-30 19:51:46
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 16:11:12
 * @Description: 社保页路由
 */
import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    path: '', // 二级路由不需要写，在访问一级路由的时候，可以访问下面这个组件
    name: 'social_securitys', // 这个 name 在后面的权限管理中会用到
    component: () => import('@/views/social'),
    // 路由元信息
    meta: {
      title: '社保', // 侧边栏在遍历的时候，会遍历这里的 title
      icon: 'table'
    }
  },
  // 报表
  {
    path: 'detail/:id',
    hidden: true,
    component: () => import('@/views/social/detail'),
    name: 'socialDetail',
    meta: {
      title: '社保'
    }
  },
  // 历史归档
  {
    path: 'historicalArchiving',
    hidden: true,
    component: () => import('@/views/social/historical'),
    name: 'socialHistorical',
    meta: {
      title: '历史归档'
    }
  },
  // 月报表
  {
    path: 'monthStatement',
    component: () => import('@/views/social/month'),
    name: 'socialMonthStatement',
    hidden: true,
    meta: {
      title: '当月报表'
    }
  }]
}
