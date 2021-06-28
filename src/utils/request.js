// 二次封装 axios
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器：请求拦截器主要处理 token 的统一注入问题
service.interceptors.request.use()

// 响应拦截器：响应拦截器主要处理 返回的数据异常和数据结构问题
service.interceptors.response.use()

export default service
