/*
 * @Author: fan
 * @Date: 2021-07-05 20:35:44
 * @LastEditors: fan
 * @LastEditTime: 2021-07-20 11:23:58
 * @Description: 组件统一全局注册入口
 */

import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImage from './UploadImage'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'

export default {
  install(Vue) {
    // 注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
    Vue.use(Print) // 注册打印功能的插件
    Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
  }
}
