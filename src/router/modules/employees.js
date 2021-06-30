/*
 * @Author: fan
 * @Date: 2021-06-30 19:51:46
 * @LastEditors: fan
 * @LastEditTime: 2021-06-30 21:08:26
 * @Description: 员工页路由
 */
import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [{
    path: '', // 二级路由不需要写，在访问一级路由的时候，可以访问下面这个组件
    name: 'employees', // 这个 name 在后面的权限管理中会用到
    component: () => import('@/views/employees'),
    // 路由元信息
    meta: {
      title: '员工', // 侧边栏在遍历的时候，会遍历这里的 title
      icon: 'people'
    }
  }]
}
