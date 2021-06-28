/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-28 23:28:42
 * @Description: axios 二次封装
 */
// 二次封装 axios
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器：请求拦截器主要处理 token 的统一注入问题
service.interceptors.request.use()

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
