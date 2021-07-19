/*
 * @Author: fan
 * @Date: 2021-06-30 19:51:46
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 18:16:35
 * @Description: 审批页路由
 */
import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [{
    path: '', // 二级路由不需要写，在访问一级路由的时候，可以访问下面这个组件
    name: 'approvals', // 这个 name 在后面的权限管理中会用到
    component: () => import('@/views/approvals'),
    // 路由元信息
    meta: {
      title: '审批', // 侧边栏在遍历的时候，会遍历这里的 title
      icon: 'tree-table'
    }
  },
  {
    path: 'salaryApproval/:id',
    component: () => import('@/views/approvals/salary'),
    name: 'salaryApproval',
    hidden: true,
    meta: {
      title: '工资审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'enterApproval/:id',
    component: () => import('@/views/approvals/enter'),
    name: 'enterApproval',
    hidden: true,
    meta: {
      title: '入职审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'leaveApproval/:id',
    component: () => import('@/views/approvals/leave'),
    name: 'leaveApproval',
    hidden: true,
    meta: {
      title: '申请请假',
      icon: 'approval', noCache: true }
  },
  {
    path: 'quitApproval/:id',
    component: () => import('@/views/approvals/quit'),
    name: 'quitApproval',
    hidden: true,
    meta: {
      title: '申请离职',
      icon: 'approval', noCache: true }
  },
  {
    path: 'overtimeApproval/:id',
    component: () => import('@/views/approvals/overtime'),
    name: 'overtimeApproval',
    hidden: true,
    meta: {
      title: '加班申请',
      icon: 'approval', noCache: true }
  },
  {
    path: 'securitySetting',
    component: () => import('@/views/approvals/security'),
    name: 'securitySetting',
    hidden: true,
    meta: {
      title: '设置',
      icon: 'approval', noCache: true }
  }]
}
