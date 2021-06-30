/*
 * @Author: fan
 * @Date: 2021-06-28 19:34:01
 * @LastEditors: fan
 * @LastEditTime: 2021-06-30 21:05:42
 * @Description: 注册icon组件，并将所有svg图片导入到项目中
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// 下面两行代码是将所有 svg 图片导入到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
