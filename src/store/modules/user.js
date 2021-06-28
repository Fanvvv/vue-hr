/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 00:04:54
 * @Description: 用户的状态
 */

import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken()
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
  }
}

// 执行异步
const actions = {
  // 定义 login action 也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  }
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
