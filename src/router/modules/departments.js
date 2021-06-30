/*
 * @Author: fan
 * @Date: 2021-06-30 19:51:46
 * @LastEditors: fan
 * @LastEditTime: 2021-06-30 21:08:10
 * @Description: 组织架构页路由
 */
import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [{
    path: '', // 二级路由不需要写，在访问一级路由的时候，可以访问下面这个组件
    name: 'departments', // 这个 name 在后面的权限管理中会用到
    component: () => import('@/views/departments'),
    // 路由元信息
    meta: {
      title: '组织架构', // 侧边栏在遍历的时候，会遍历这里的 title
      icon: 'tree'
    }
  }]
}
