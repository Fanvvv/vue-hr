/*
 * @Author: fan
 * @Date: 2021-07-18 20:45:32
 * @LastEditors: fan
 * @LastEditTime: 2021-07-18 21:49:28
 * @Description: 权限管理的状态
 */
import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes // 所有人默认拥有静态路由
}

const mutations = {
  setRoutes(state, newRoutes) {
    // 这样写业务是错误的
    // state.routes = [...state.routes, ...newRoutes]
    // 应该是在静态路由的基础上添加路由
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // asyncRoutes 是所有动态路由
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      // 寻找动态路由中的name 与 menus 相同，表示拥有权限
      routes.push(...asyncRoutes.filter(item => item.children[0].name === key))
    })
    // 将动态路由提交给mutations
    context.commit('setRoutes', routes)
    // state数据 是用来 显示左侧菜单用的
    // return  是给路由addRoutes用的
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
