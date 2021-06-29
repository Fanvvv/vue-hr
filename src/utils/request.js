/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-29 18:22:04
 * @Description: axios 二次封装
 */
// 二次封装 axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from './auth'

const TimeOut = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * @description 判断是否超时
 * @returns 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
 */
function isCheckOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  console.log(currentTime, timeStamp)
  return (currentTime - timeStamp) / 1000 > TimeOut
}
// 请求拦截器：请求拦截器主要处理 token 的统一注入问题
service.interceptors.request.use(config => {
  // 统一注入 token
  if (store.getters.token) {
    // 只有在有 token 的时候才需要判断是否超时
    if (isCheckOut()) {
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, err => {
  return Promise.reject(err)
})

// 响应拦截器：响应拦截器主要处理 返回的数据异常和数据结构问题
service.interceptors.response.use(response => {
  // axios 默认加了一层 data
  const { success, message, data } = response.data
  // 根据 success 的成功与否觉得下面的操作
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, err => {
  Message.error(err.message) // 提示错误信息
  return Promise.reject(err)
})

export default service
