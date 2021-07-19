/*
 * @Author: fan
 * @Date: 2021-07-19 22:41:35
 * @LastEditors: fan
 * @LastEditTime: 2021-07-19 22:41:59
 * @Description: 用户模块路由
 */
import Layout from '@/layout'

export default {
  path: '/users',
  component: Layout,
  hidden: true,
  name: 'user',
  children: [
    {
      path: '/users/approvals',
      component: () => import('@/views/users/approvals'),
      name: 'usersApprovals',
      hidden: true,
      meta: {
        title: '用户'
      }
    },
    {
      path: '/users/info',
      component: () => import('@/views/users/info'),
      name: 'myInfo',
      hidden: true,
      meta: {
        title: '我的信息'
      }
    }
  ]
}
