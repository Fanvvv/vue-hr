/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 17:57:07
 * @Description: 用户的状态
 */

import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken(),
  userInfo: {} // 初始化用户信息，不能为null，否则vuex中取用户信息的值会报错
}

// 修改状态
const mutations = {
  // 设置 token
  setToken(state, token) {
    state.token = token // 设置 token，只是修改 state 的数据
    setToken(token) // vuex 和缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除 vuex 的 token
    removeToken() // 先清除 vuex 再清除缓存
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  // 移除用户信息
  removeUserInfo() {
    state.userInfo = {} // 用户信息置空
  }
}

// 执行异步
const actions = {
  // 定义 login action 也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },
  // 也可以使用 promise 的方法
  // login(context, data) {
  //   return new Promise(function(resolve) {
  //     login(data).then(result => {
  //       if (result.data.success) {
  //         context.commit('setToken', result.data.data) // 提交mutations设置token
  //         resolve() // 执行成功
  //       }
  //     })
  //   })
  // }

  // 获取用户信息资料
  async getUserInfo(context) {
    // 获取基本信息
    const result = await getUserInfo()
    // 为了获取头像
    const detail = await getUserDetailById(result.userId)
    // 把用户信息和头像合并在一起再提交到 mutations
    context.commit('setUserInfo', { ...result, ...detail })
    // 这里直接返回 result 也是没关系的，因为 detail 是用于获取用户头像
    return result // 这里需要添加返回值，后面可以用到
  },

  // 退出登录
  logout(context) {
    // 删除 token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户信息
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
