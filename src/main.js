/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-07-20 15:23:51
 * @Description: 入口文件
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives' // 自定义指令
import * as filters from '@/filters' // 过滤器
import Components from '@/components'
import CheckPermission from '@/mixin/checkPermission'
import i18n from '@/lang'

// 遍历所有自定义指令并注册
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 设置element为当前的语言
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(Components) // 全局注册自己封装的组件
// 全局混入一个检测对象
Vue.mixin(CheckPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
